import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const Description = new GraphQLObjectType({
  name: 'Description',
  description: 'The description for the media.',
  fields: {
    rendered: { type: GraphQLString },
  },
});

export default Description;
