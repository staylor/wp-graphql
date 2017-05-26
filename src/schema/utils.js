import { GraphQLID, GraphQLString } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

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
  'post',
];

const listArgs = [...encodedArgs, 'slug', 'roles'];

const filterArgs = ['year'];

const toEdges = (data, offset) => {
  let i = offset;
  return data.map(item => ({
    node: item,
    cursor: indexToCursor((i += 1)),
  }));
};

export const collectionEdges = ({ data, total, offset }) => {
  const startIndex = offset;
  const endIndex = startIndex + (data.length - 1);

  return {
    edges: toEdges(data, startIndex),
    pageInfo: {
      hasNextPage: endIndex < total - 1,
      hasPreviousPage: startIndex > 0,
      startCursor: total > 0 ? indexToCursor(startIndex) : null,
      endCursor: total > 0 ? indexToCursor(endIndex) : null,
    },
  };
};

export const loadEdges = DataType => (root, args) => {
  const filters = {};
  const params = {
    qs: root.args || {},
  };

  if (Object.keys(root.args).length > 0) {
    filterArgs.forEach((key) => {
      if (params.qs[key]) {
        filters[key] = params.qs[key];
        delete params.qs[key];
      }
    });

    if (Object.keys(filters).length) {
      params.qs.filter = filters;
    }

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

  return DataType.collection(params).then(({ items, total }) =>
    collectionEdges({
      data: items,
      total: parseInt(total, 10),
      offset,
    }),
  );
};

export const itemResolver = (dataType, loader) => ({
  type: dataType,
  args: {
    id: {
      type: GraphQLID,
      description: 'Unique identifier for the object.',
    },
    slug: {
      type: GraphQLString,
      description: 'An alphanumeric identifier for the object unique to its type.',
    },
  },
  // eslint-disable-next-line no-confusing-arrow
  resolve: (root, { id, slug }) => {
    if (slug && loader.loadBySlug) {
      return loader.loadBySlug(slug);
    }
    return loader.load(id);
  },
});
