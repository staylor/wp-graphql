import SidebarCollectionType from 'type/Sidebar/Collection';
import SidebarType from 'type/Sidebar';
import Sidebar from 'data/Sidebar';
import { itemResolver } from 'utils';

export default {
  sidebars: {
    type: SidebarCollectionType,
    resolve: (root, args) => ({ args }),
  },
  sidebar: itemResolver(SidebarType, Sidebar),
};
