import { GraphQLObjectType } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
} from 'graphql-relay';

import StatusType from 'type/Status';
import { loadEdges } from 'utils';
import Status from 'data/Status';

const { connectionType: StatusConnection } =
  connectionDefinitions({ nodeType: StatusType });

const StatusCollectionType = new GraphQLObjectType({
  name: 'StatusCollection',
  description: 'Collection of statuses based on cursors.',
  fields: {
    results: {
      type: StatusConnection,
      args: connectionArgs,
      description: 'A list of results',
      resolve: loadEdges(Status, '/statuses'),
    },
  },
});

export default StatusCollectionType;
