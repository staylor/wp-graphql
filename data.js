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

const getPost = id => rp(`/posts/${id}`);
const getUser = id => rp(`/users/${id}`);
const getCategory = id => rp(`/categories/${id}`);
const getTag = id => rp(`/tags/${id}`);

const posts = new Dataloader(ids => Promise.all(ids.map(getPost)));
const users = new Dataloader(ids => Promise.all(ids.map(getUser)));
const categories = new Dataloader(ids => Promise.all(ids.map(getCategory)));
const tags = new Dataloader(ids => Promise.all(ids.map(getTag)));

export {
  posts,
  users,
  categories,
  tags,
};

export default rp;
