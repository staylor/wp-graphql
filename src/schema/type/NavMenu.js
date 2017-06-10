import { GraphQLObjectType, GraphQLList } from 'graphql';
import NavMenuItemType from 'type/NavMenuItem';
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
  },
});

export default NavMenuType;
