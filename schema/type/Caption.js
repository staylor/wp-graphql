import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const Caption = new GraphQLObjectType({
  name: 'Caption',
  description: 'The caption for the media.',
  fields: {
    rendered: { type: GraphQLString },
  },
});

export default Caption;
