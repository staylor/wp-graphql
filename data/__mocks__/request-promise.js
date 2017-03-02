import fs from 'fs';
import path from 'path';
import url from 'url';

const stubsDir = path.resolve('./data/stubs');
const stubs = {
  'wp/v2/categories': () => fs.readFileSync(`${stubsDir}/categories.json`, 'utf8'),
  'wp/v2/comments': () => fs.readFileSync(`${stubsDir}/comments.json`, 'utf8'),
  'wp/v2/media': () => fs.readFileSync(`${stubsDir}/media.json`, 'utf8'),
  'graphql/v1/nav-menus': () => fs.readFileSync(`${stubsDir}/nav-menus.json`, 'utf8'),
  'wp/v2/pages': () => fs.readFileSync(`${stubsDir}/pages.json`, 'utf8'),
  'wp/v2/posts': () => fs.readFileSync(`${stubsDir}/posts.json`, 'utf8'),
  'graphql/v1/sidebars': () => fs.readFileSync(`${stubsDir}/sidebars.json`, 'utf8'),
  'wp/v2/statuses': () => fs.readFileSync(`${stubsDir}/statuses.json`, 'utf8'),
  'wp/v2/tags': () => fs.readFileSync(`${stubsDir}/tags.json`, 'utf8'),
  'wp/v2/taxonomies': () => fs.readFileSync(`${stubsDir}/taxonomies.json`, 'utf8'),
  'wp/v2/types': () => fs.readFileSync(`${stubsDir}/types.json`, 'utf8'),
  'wp/v2/users': () => fs.readFileSync(`${stubsDir}/users.json`, 'utf8'),
};

const rp = (opts) => {
  const urlObj = url.parse(opts.uri);
  const urlPath = urlObj.path.replace(/\/wp-json\//, '');

  if (!stubs[urlPath]) {
    throw new Error('No stub available for this path :(');
  }

  const data = JSON.parse(stubs[urlPath]());
  const params = { ...opts.qs };
  delete params.resolveWithFullResponse;
  if (Object.keys(params).length) {
    if (params.include) {
      const ids = params.include.map(id => parseInt(id, 10));
      const results = ids.map(id => data.find(item => item.id === id));
      return Promise.resolve({
        body: results,
        headers: {
          'x-wp-total': data.length,
        },
      });
    }
  }

  return Promise.resolve({
    body: data,
    headers: {
      'x-wp-total': data.length,
    },
  });
};

export default rp;
