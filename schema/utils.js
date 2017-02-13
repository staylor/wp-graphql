import { GraphQLInt } from 'graphql';

import request from 'data';

export const resolveWithArgs = path => (root, args) => {
  const opts = {};
  if (Object.keys(args).length > 0) {
    opts.qs = args;
    [
      'include',
      'exclude',
      'author',
      'author_exclude',
      'parent',
      'parent_exclude',
      'slug',
      'roles',
    ].forEach((key) => {
      if (opts.qs[key]) {
        opts.qs[key] = opts.qs[key].split(',');
      }
    });
  }
  return request(path, opts);
};

export const itemResolver = (dataType, loader) => ({
  type: dataType,
  args: {
    id: {
      type: GraphQLInt,
      description: 'Unique identifier for the object.',
    },
  },
  // eslint-disable-next-line no-confusing-arrow
  resolve: (root, { id }) => loader.load(id),
});
