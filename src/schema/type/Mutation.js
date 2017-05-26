import { GraphQLObjectType } from 'graphql';
import CommentMutations from 'mutation/Comment';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...CommentMutations,
  }),
});

export default Mutation;
