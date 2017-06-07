import { GraphQLObjectType } from 'graphql';
import { connectionArgs, connectionDefinitions } from 'graphql-relay';

import PostType from 'type/Post';
import { loadEdges } from 'utils';
import Post from 'data/Post';

const { connectionType: PostConnection } = connectionDefinitions({
  nodeType: PostType,
});

const PostCollectionType = new GraphQLObjectType({
  name: 'PostCollection',
  description: 'Collection of posts based on cursors.',
  fields: {
    results: {
      type: PostConnection,
      args: connectionArgs,
      description: 'A list of results',
      resolve: loadEdges(Post),
    },
  },
});

export { PostConnection };
export default PostCollectionType;
