import url from 'url';
import request from 'request-promise';
import { toBase64 } from 'utils';
import { getClient } from 'data/store';

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

export default rp;
