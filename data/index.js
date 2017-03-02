import url from 'url';
import request from 'request-promise';
import { toBase64, indexToCursor } from 'utils';
import redis, { getClient } from 'data/store';

const rp = (path, opts = {}) => {
  let uri = path;
  const urlObj = url.parse(path);
  if (!urlObj.host) {
    uri = `${process.env.WP_API_HOST}${path}`;
  }

  const params = Object.assign({
    uri,
    jar: true,
    json: true,
    simple: true,
    strictSSL: false,
  }, opts);

  return request(params);
};

export const fetchData = (path, opts = {}, expire = null) => {
  const client = getClient();
  const key = toBase64(`${path}${JSON.stringify(opts)}`);

  const params = {
    ...opts,
    resolveWithFullResponse: true,
  };

  return new Promise((resolve, reject) => {
    client.get(key, (err, cached) => {
      if (err) {
        reject(err);
      } else if (cached) {
        resolve({
          cache: 'hit',
          data: JSON.parse(cached),
        });
      } else {
        rp(path, params)
          .catch(error => reject(error))
          .then((response) => {
            client.set(key, JSON.stringify(response));
            client.expire(key, expire || process.env.REQUEST_CACHE_TTL || 60);
            resolve({
              cache: 'miss',
              data: response,
            });
          });
      }
    });
  });
};

/* eslint-disable no-console */

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
      hasNextPage: endIndex < (total - 1),
      hasPreviousPage: startIndex > 0,
      startCursor: total > 0 ? indexToCursor(startIndex) : null,
      endCursor: total > 0 ? indexToCursor(endIndex) : null,
    },
  };
};

export const fetchCollection = (DataType, opts = {}) => {
  const path = DataType.getEndpoint();
  return rp(path, opts).then((response) => {
    let data = response.body;
    const wpTotal = parseInt(response.headers['x-wp-total'], 10);
    const offset = (opts.qs && opts.qs.offset) || 0;

    if (!Array.isArray(data)) {
      data = Object.keys(data).map(itemKey => data[itemKey]);
    }

    const hydrated = data.map(value => Object.assign(new DataType(), value));

    const connection = collectionEdges({
      data: hydrated,
      total: wpTotal,
      offset,
    });
    return connection;
  });
};

export const loadCollection = (DataType, opts = {}) => {
  const path = DataType.getEndpoint();
  console.log(`Loading collection: ${path}`, JSON.stringify(opts));
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
        Promise.all(hashes.map(DataType.load))
          .catch(error => reject(error))
          .then((data) => {
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
          let data = response.body;
          const wpTotal = parseInt(response.headers['x-wp-total'], 10);
          const offset = (opts.qs && opts.qs.offset) || 0;

          if (!Array.isArray(data)) {
            data = Object.keys(data).map(itemKey => data[itemKey]);
          }

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

export default rp;
