import request from 'request-promise';
import Dataloader from 'dataloader';
import { decodeIDs } from 'utils';
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

export const createLoader = path => (
  new Dataloader(ids => (
    new Promise((resolve, reject) => {
      const cache = {};
      const pending = [];
      const response = [];

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
                  args.push(id);
                  args.push(JSON.stringify(results[index]));
                });
                console.log('Saving items to the cache...');
                client.mset(...args, redis.print);

                ids.forEach(id => response.push(cache[id]));
                resolve(response);
              });
          } else {
            console.log('All results read from cache!');
            ids.forEach(id => response.push(cache[id]));
            resolve(response);
          }
        }
      });
    })
  ))
);

export default rp;
