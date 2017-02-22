import NavMenuCollectionType from 'type/NavMenu/Collection';
import NavMenuType from 'type/NavMenu';
import NavMenu from 'data/NavMenu';
import { itemResolver } from 'utils';

export default {
  navMenus: {
    type: NavMenuCollectionType,
    resolve: (root, args) => ({ args }),
  },
  navMenu: itemResolver(NavMenuType, NavMenu),
};
