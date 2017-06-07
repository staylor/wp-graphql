import { GraphQLID, GraphQLString } from 'graphql';
import { fromGlobalId, cursorToOffset, connectionFromArraySlice } from 'graphql-relay';

export const decodeIDs = opaque => opaque.map(hash => fromGlobalId(hash).id);

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

export const loadEdges = DataType => (root, args) => {
  const filters = {};
  const params = {
    qs: root.args || {},
  };

  if (Object.keys(root.args).length > 0) {
    filterArgs.forEach(key => {
      if (params.qs[key]) {
        filters[key] = params.qs[key];
        delete params.qs[key];
      }
    });

    if (Object.keys(filters).length) {
      params.qs.filter = filters;
    }

    listArgs.forEach(key => {
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
    offset = cursorToOffset(args.after) + 1;
  } else if (args.before) {
    offset = cursorToOffset(args.before) - limit;
  }

  if (offset > 0) {
    params.qs.offset = offset;
  }

  return DataType.collection(params).then(({ items, total }) => {
    const result = connectionFromArraySlice(
      items,
      {},
      {
        arrayLength: total ? parseInt(total, 10) : items.length,
        sliceStart: offset,
      }
    );
    return result;
  });
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
