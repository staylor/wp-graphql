import { GraphQLObjectType } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

import PostType from 'type/Post';
import { nodeInterface } from 'type/relayNode';

const { connectionType: PostConnection } =
  connectionDefinitions({ nodeType: PostType });

const CollectionType = new GraphQLObjectType({
  name: 'Collection',
  description: 'Collection of posts based on cursors.',
  interfaces: () => [nodeInterface],
  results: {
    type: PostConnection,
    description: 'A list of results',
  },
});

export default CollectionType;
