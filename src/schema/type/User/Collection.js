import { GraphQLObjectType } from 'graphql';
import { connectionArgs, connectionDefinitions } from 'graphql-relay';

import UserType from 'type/User';
import { loadEdges } from 'utils';
import User from 'data/User';

const { connectionType: UserConnection } = connectionDefinitions({
  nodeType: UserType,
});

const UserCollectionType = new GraphQLObjectType({
  name: 'UserCollection',
  description: 'Collection of users based on cursors.',
  fields: {
    results: {
      type: UserConnection,
      args: connectionArgs,
      description: 'A list of results',
      resolve: loadEdges(User),
    },
  },
});

export default UserCollectionType;
