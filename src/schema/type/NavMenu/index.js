import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import NavMenuLinks from 'type/NavMenu/Links';
import NavMenuItemType from 'type/NavMenu/Item';
import { globalIdField, name } from 'field/identifier';
import description from 'field/description';

const NavMenuType = new GraphQLObjectType({
  name: 'NavMenu',
  description: 'A nav menu.',
  fields: {
    id: globalIdField(),
    ...name,
    ...description,
    items: {
      type: new GraphQLList(NavMenuItemType),
      description: 'Items associated with the menu.',
    },
    _links: { type: NavMenuLinks },
  },
});

export default NavMenuType;
