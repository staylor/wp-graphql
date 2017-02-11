import { GraphQLInt } from 'graphql';

export const itemResolver = (dataType, loader) => ({
  type: dataType,
  args: {
    id: { type: GraphQLInt },
  },
  // eslint-disable-next-line no-confusing-arrow
  resolve: (root, { id }) => loader.load(id),
});

export const metaResolver = (data) => {
  if (!data.meta || !data.meta.length) {
    return null;
  }
  return Object.keys(data.meta).map(key => ({
    key,
    value: data.meta[key],
  }));
};
