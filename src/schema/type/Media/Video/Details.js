import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const VideoDetails = new GraphQLObjectType({
  name: 'VideoDetails',
  description: 'The details for the media.',
  fields: {
    title: { type: GraphQLString },
  },
});

export default VideoDetails;
