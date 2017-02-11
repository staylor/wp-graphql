import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import MediaSize from './MediaSize';

const MediaDetails = new GraphQLObjectType({
  name: 'MediaDetails',
  description: 'The details for the media.',
  fields: {
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
    file: { type: GraphQLString },
    sizes: {
      type: new GraphQLList(MediaSize),
      resolve: sizes => (
        Object.keys(sizes).map(size => ({
          ...sizes[size],
          name: size,
        }))
      ),
    },
  },
});

export default MediaDetails;
