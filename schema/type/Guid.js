import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const Guid = new GraphQLObjectType({
  name: 'Guid',
  description: 'A unique identifier for a post.',
  fields: {
    rendered: { type: GraphQLString },
  },
});

export default Guid;
