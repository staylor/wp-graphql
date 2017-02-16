import request from 'request-promise';
import Dataloader from 'dataloader';
import { decodeIDs, toBase64 } from 'utils';
import redis, { client } from 'data/store';

const rp = (path, opts = {}) => {
  const params = Object.assign({
    uri: `${process.env.WP_API_HOST}${path}`,
    jar: true,
    json: true,
    simple: true,
    strictSSL: false,
  }, opts);

  return request(params);
};

/* eslint-disable no-console */

export const loadIDs = (ids, path) => (
  new Promise((resolve, reject) => {
    const cache = {};
    const pending = [];

    client.mget(ids, (err, res) => {
      if (err) {
        console.log(`Error loading from cache:${err}`);
        reject(err);
      } else {
        ids.forEach((id, index) => {
          if (res[index]) {
            cache[id] = JSON.parse(res[index]);
          } else {
            pending.push(id);
          }
        });

        if (pending.length) {
          console.log(`Missing from redis: ${pending.join(',')}`);
          rp(path, { qs: { include: decodeIDs(pending) } })
            .then((results) => {
              const args = [];
              pending.forEach((id, index) => {
                cache[id] = results[index];
                // collect args for multi-set splat
                args.push(id);
                args.push(JSON.stringify(results[index]));
              });
              console.log('Saving items to the cache...');
              client.mset(...args, redis.print);

              ids.map(id => cache[id]);
              resolve(ids.map(id => cache[id]));
            });
        } else {
          console.log('All results read from cache!');
          resolve(ids.map(id => cache[id]));
        }
      }
    });
  })
);

export const loadCollection = (DataType, path, opts = {}) => {
  if (opts.qs && opts.qs.include) {
    return loadIDs(opts.qs.include, path).then(data => (
      data.map(value => Object.assign(new DataType(), value))),
    );
  }

  // A short TTL request cache based on path + serialized opts, only stores IDs
  // think pagination...

  const key = toBase64(`${path}${JSON.stringify(opts)}`);
  return new Promise((resolve, reject) => {
    client.get(key, (err, res) => {
      if (err) {
        reject(err);
      } else if (res) {
        const ids = res.split(',');
        console.log('Cache Hit: only request these IDs from dataloader.');
        resolve(ids.map(DataType.load));
      } else {
        console.log('Cache Miss: requesting data...');
        rp(path, opts).then((data) => {
          const opaque = [];
          const args = [];
          const hydrated = data.map((value) => {
            // we must hyrdrate to get the opaque ID
            const obj = Object.assign(new DataType(), value);
            const id = obj.getID();
            opaque.push(id);
            // collect args for multi-set splat
            args.push(id);
            args.push(JSON.stringify(value));
            return obj;
          });
          console.log('Populating cache...');
          client.mset(...args, redis.print);
          // there is no guarantee that lists return in order
          client.set(key, opaque.join(','), redis.print);
          // low TTL, this is explicitly for performance
          client.expire(key, 60);
          resolve(hydrated);
        });
      }
    });
  });
};

export const createLoader = path => (
  new Dataloader(ids => loadIDs(ids, path))
);

export default rp;
