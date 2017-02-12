import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import MediaSize from 'type/Media/Size';

const MediaDetails = new GraphQLObjectType({
  name: 'MediaDetails',
  description: 'The details for the media.',
  fields: {
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
    file: { type: GraphQLString },
    sizes: {
      type: new GraphQLList(MediaSize),
      resolve: media => (
        Object.keys(media.sizes).map(size => ({
          ...media.sizes[size],
          name: size,
        }))
      ),
    },
  },
});

export default MediaDetails;
