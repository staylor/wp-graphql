import request from 'request-promise';
import Dataloader from 'dataloader';
import { decodeIDs, toBase64, indexToCursor } from 'utils';
import redis, { getClient } from 'data/store';

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
    const client = getClient();
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
            .catch((error) => {
              console.log(`Pending IDs: ${JSON.stringify(pending)}`);
              console.log(error);
            })
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

const toEdges = (data, offset) => {
  let i = offset;
  return data.map(item => ({
    node: item,
    cursor: indexToCursor(i += 1),
  }));
};

export const collectionEdges = ({ data, total, offset }) => {
  const startIndex = offset;
  const endIndex = startIndex + (data.length - 1);

  return {
    edges: toEdges(data, startIndex),
    pageInfo: {
      hasNextPage: endIndex < total,
      hasPreviousPage: startIndex > 0,
      startCursor: total > 0 ? indexToCursor(startIndex) : null,
      endCursor: total > 0 ? indexToCursor(endIndex) : null,
    },
  };
};

export const loadCollection = (DataType, path, opts = {}) => {
  console.log(`Loading collection: ${path}`, JSON.stringify(opts));
  if (opts.qs && opts.qs.include) {
    return loadIDs(opts.qs.include, path).then(data => (
      data.map(value => Object.assign(new DataType(), value))),
    );
  }

  // A short TTL request cache based on path + serialized opts, only stores IDs
  // think pagination...

  const client = getClient();
  const key = toBase64(`${path}${JSON.stringify(opts)}`);
  return new Promise((resolve, reject) => {
    client.hgetall(key, (err, cached) => {
      if (err) {
        reject(err);
      } else if (cached) {
        const { ids, total } = cached;
        const hashes = ids.split(',');
        console.log('Cache Hit: only request these IDs from dataloader.');
        Promise.all(hashes.map(DataType.load)).then((data) => {
          const connection = collectionEdges({
            data,
            total,
            offset: (opts.qs && opts.qs.offset) || 0,
          });
          resolve(connection);
        });
      } else {
        console.log('Cache Miss: requesting data...');
        rp(path, opts).catch(error => reject(error)).then((response) => {
          const data = response.body;
          const wpTotal = parseInt(response.headers['x-wp-total'], 10);
          const offset = (opts.qs && opts.qs.offset) || 0;

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
          if (data.length) {
            console.log('Populating cache...');
            if (data.length > 1) {
              client.mset(...args, redis.print);
            } else {
              client.set(...args, redis.print);
            }
          }
          // there is no guarantee that redis lists return in order,
          // so we set an object
          client.hmset(key, 'ids', opaque.join(','), 'total', wpTotal, redis.print);
          // low TTL, this is explicitly for performance
          client.expire(key, process.env.REQUEST_CACHE_TTL || 60);

          const connection = collectionEdges({
            data: hydrated,
            total: wpTotal,
            offset,
          });
          resolve(connection);
        });
      }
    });
  });
};

export const createLoader = path => (
  new Dataloader(ids => loadIDs(ids, path))
);

export default rp;
