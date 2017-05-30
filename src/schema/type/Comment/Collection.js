import { GraphQLObjectType } from 'graphql';
import { connectionArgs, connectionDefinitions } from 'graphql-relay';

import CommentType from 'type/Comment';
import { loadEdges } from 'utils';
import Comment from 'data/Comment';

const { connectionType: CommentConnection, edgeType: CommentEdge } = connectionDefinitions({
  nodeType: CommentType,
});

const CommentCollectionType = new GraphQLObjectType({
  name: 'CommentCollection',
  description: 'Collection of comments based on cursors.',
  fields: {
    results: {
      type: CommentConnection,
      args: connectionArgs,
      description: 'A list of results',
      resolve: loadEdges(Comment),
    },
  },
});

export { CommentConnection };
export { CommentEdge };

export default CommentCollectionType;
