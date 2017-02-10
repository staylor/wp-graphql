import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const Meta = new GraphQLObjectType({
  name: 'Meta',
  description: 'The metadata for a post.',
  fields: {
    key: { type: GraphQLString },
    value: { type: GraphQLString },
  },
});

export default Meta;
