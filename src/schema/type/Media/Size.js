import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

const MediaSizeType = new GraphQLObjectType({
  name: 'MediaSize',
  description: 'The details for the media size.',
  fields: {
    name: { type: GraphQLString },
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
    file: { type: GraphQLString },
    mimeType: { type: GraphQLString },
    sourceUrl: { type: GraphQLString },
  },
});

export default MediaSizeType;
