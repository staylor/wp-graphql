import { GraphQLObjectType } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
} from 'graphql-relay';

import MediaType from 'type/Media';
import { loadEdges } from 'data';
import Media from 'data/Media';

const { connectionType: MediaConnection } =
  connectionDefinitions({ nodeType: MediaType });

const MediaCollectionType = new GraphQLObjectType({
  name: 'MediaCollection',
  description: 'Collection of media based on cursors.',
  fields: {
    results: {
      type: MediaConnection,
      args: connectionArgs,
      description: 'A list of results',
      resolve: loadEdges(Media, '/media'),
    },
  },
});

export default MediaCollectionType;
