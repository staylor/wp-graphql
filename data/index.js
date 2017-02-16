import request from 'request-promise';
import Dataloader from 'dataloader';
import { decodeIDs } from 'utils';

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

export const createLoader = path => (
  new Dataloader(ids => rp(path, { qs: { include: decodeIDs(ids) } }))
);

export default rp;
