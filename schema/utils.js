import { GraphQLID } from 'graphql';
import { fromGlobalId } from 'graphql-relay';
import { loadCollection } from 'data';

export const toBase64 = str => new Buffer(str).toString('base64');
export const fromBase64 = encoded => Buffer.from(encoded, 'base64').toString('utf8');
export const decodeIDs = opaque => opaque.map(hash => fromGlobalId(hash).id);
const idxPrefix = 'idx---';
export const indexToCursor = idx => toBase64(`${idxPrefix}${idx}`);
export const indexFromCursor = cursor => parseInt(fromBase64(cursor).replace(idxPrefix, ''), 10);

const encodedArgs = [
  'include',
  'exclude',
  'author',
  'author_exclude',
  'parent',
  'parent_exclude',
  'categories',
  'categories_exclude',
  'tags',
  'tags_exclude',
];

const listArgs = [
  ...encodedArgs,
  'slug',
  'roles',
];

export const loadEdges = (DataType, path) => (root, args) => {
  const params = {
    resolveWithFullResponse: true,
    qs: root.args || {},
  };

  params.qs.sticky = params.qs.sticky || false;

  if (Object.keys(root.args).length > 0) {
    listArgs.forEach((key) => {
      if (params.qs[key]) {
        params.qs[key] = params.qs[key].split(',');
        if (encodedArgs.indexOf(key) > -1) {
          params.qs[key] = decodeIDs(params.qs[key]);
        }
      }
    });
  }

  const limit = args.first || args.last || 0;

  if (limit > 0) {
    params.qs.per_page = limit;
  }

  let offset = 0;
  if (args.after) {
    offset = indexFromCursor(args.after) + 1;
  } else if (args.before) {
    offset = indexFromCursor(args.before) - limit;
  }

  if (offset > 0) {
    params.qs.offset = offset;
  }

  return loadCollection(DataType, path, params)
    .catch(e => Promise.reject(e));
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
