import { GraphQLObjectType } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
} from 'graphql-relay';

import SidebarType from 'type/Sidebar';
import { loadEdges } from 'utils';
import Sidebar from 'data/Sidebar';

const { connectionType: SidebarConnection } =
  connectionDefinitions({ nodeType: SidebarType });

const SidebarCollectionType = new GraphQLObjectType({
  name: 'SidebarCollection',
  description: 'Collection of sidebars based on cursors.',
  fields: {
    results: {
      type: SidebarConnection,
      args: connectionArgs,
      description: 'A list of results',
      resolve: loadEdges(Sidebar, '/sidebars'),
    },
  },
});

export default SidebarCollectionType;
