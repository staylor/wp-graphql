import { GraphQLID } from 'graphql';
import { loadCollection } from 'data';

export const toBase64 = str => new Buffer(str).toString('base64');
export const fromBase64 = encoded => Buffer.from(encoded, 'base64').toString('utf8');
export const decodeIDs = opaque => opaque.map(fromBase64).map(id => id.split(':').pop());
export const toGlobalId = (type, id) => toBase64(`${type.toLowerCase()}:${id}`);

const listValues = [
  'include',
  'exclude',
  'author',
  'author_exclude',
  'parent',
  'parent_exclude',
  'slug',
  'roles',
];

export const resolveWithArgs = (path, DataType) => (root, args) => {
  const opts = {};
  if (Object.keys(args).length > 0) {
    opts.qs = args;
    listValues.forEach((key) => {
      if (opts.qs[key]) {
        opts.qs[key] = opts.qs[key].split(',');
      }
    });
  }
  return loadCollection(DataType, path, opts);
};

export const itemResolver = (dataType, loader) => ({
  type: dataType,
  args: {
    id: {
      type: GraphQLID,
      description: 'Unique identifier for the object.',
    },
  },
  // eslint-disable-next-line no-confusing-arrow
  resolve: (root, { id }) => loader.load(id),
});
