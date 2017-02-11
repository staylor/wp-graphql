import request from 'request-promise';
import Dataloader from 'dataloader';

const host = 'https://highforthis.com/wp-json/wp/v2';

const rp = (path, opts = {}) => {
  const params = Object.assign({
    uri: `${host}${path}`,
    json: true,
    simple: true,
    strictSSL: false,
  }, opts);

  return request(params);
};

const loader = resolver => (new Dataloader(ids => Promise.all(ids.map(resolver))));

export const posts = loader(id => rp(`/posts/${id}`));
export const pages = loader(id => rp(`/pages/${id}`));
export const users = loader(id => rp(`/users/${id}`));
export const categories = loader(id => rp(`/categories/${id}`));
export const tags = loader(id => rp(`/tags/${id}`));
export const media = loader(id => rp(`/media/${id}`));

export default rp;
