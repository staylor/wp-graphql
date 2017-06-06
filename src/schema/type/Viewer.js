import { GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { itemResolver } from 'utils';
import NavMenuType from 'type/NavMenu';
import NavMenu from 'data/NavMenu';
import SidebarType from 'type/Sidebar';
import Sidebar from 'data/Sidebar';

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: globalIdField(),
    navMenu: itemResolver(NavMenuType, NavMenu),
    sidebar: itemResolver(SidebarType, Sidebar),
  },
});

export default ViewerType;
