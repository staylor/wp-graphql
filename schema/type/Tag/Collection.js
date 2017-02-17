import { GraphQLObjectType } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
} from 'graphql-relay';

import TagType from 'type/Tag';
import { loadEdges } from 'utils';
import Tag from 'data/Tag';

const { connectionType: TagConnection } =
  connectionDefinitions({ nodeType: TagType });

const TagCollectionType = new GraphQLObjectType({
  name: 'TagCollection',
  description: 'Collection of tags based on cursors.',
  fields: {
    results: {
      type: TagConnection,
      args: connectionArgs,
      description: 'A list of results',
      resolve: loadEdges(Tag, '/tags'),
    },
  },
});

export default TagCollectionType;
