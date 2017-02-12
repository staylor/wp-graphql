import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const AudioDetails = new GraphQLObjectType({
  name: 'AudioDetails',
  description: 'The details for the media.',
  fields: {
    title: { type: GraphQLString },
  },
});

export default AudioDetails;
