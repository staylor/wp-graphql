import { GraphQLID, GraphQLString } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

export const decodeIDs = opaque => opaque.map(hash => fromGlobalId(hash).id);

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
  resolve: (root, { id: globalId, slug }) => {
    if (slug && loader.loadBySlug) {
      return loader.loadBySlug(slug);
    }
    const { id } = fromGlobalId(globalId);
    return loader.load(id);
  },
});
