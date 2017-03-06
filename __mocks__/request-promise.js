import fs from 'fs';
import path from 'path';
import url from 'url';

const stubsDir = path.resolve('./data/stubs');
const stubCache = {};
const getStub = (slug) => {
  if (stubCache[slug]) {
    return stubCache[slug];
  }
  stubCache[slug] = fs.readFileSync(`${stubsDir}/${slug}.json`, 'utf8');
  return stubCache[slug];
};
const stubs = {
  'wp/v2/categories': () => getStub('categories'),
  'wp/v2/comments': () => getStub('comments'),
  'wp/v2/media': () => getStub('media'),
  'graphql/v1/nav-menus': () => getStub('nav-menus'),
  'wp/v2/pages': () => getStub('pages'),
  'wp/v2/posts': () => getStub('posts'),
  'graphql/v1/sidebars': () => getStub('sidebars'),
  'wp/v2/statuses': () => getStub('statuses'),
  'wp/v2/tags': () => getStub('tags'),
  'wp/v2/taxonomies': () => getStub('taxonomies'),
  'wp/v2/types': () => getStub('types'),
  'wp/v2/users': () => getStub('users'),
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
    } else if (params.slug) {
      const results = params.slug.map(slug => data.find(item => item.slug === slug));
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
