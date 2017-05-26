import { GraphQLObjectType } from 'graphql';
import { connectionArgs, connectionDefinitions } from 'graphql-relay';

import NavMenuType from 'type/NavMenu';
import { loadEdges } from 'utils';
import NavMenu from 'data/NavMenu';

const { connectionType: NavMenuConnection } = connectionDefinitions({ nodeType: NavMenuType });

const NavMenuCollectionType = new GraphQLObjectType({
  name: 'NavMenuCollection',
  description: 'Collection of nav menus based on cursors.',
  fields: {
    results: {
      type: NavMenuConnection,
      args: connectionArgs,
      description: 'A list of results',
      resolve: loadEdges(NavMenu),
    },
  },
});

export default NavMenuCollectionType;
