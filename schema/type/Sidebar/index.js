import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import SidebarLinks from 'type/Sidebar/Links';

import { globalIdField, name } from 'field/identifier';
import description from 'field/description';

const TypeType = new GraphQLObjectType({
  name: 'Sidebar',
  description: 'A widget area.',
  fields: {
    id: globalIdField(),
    ...name,
    ...description,
    className: {
      type: GraphQLString,
      description: 'Extra CSS class to assign to the sidebar in the Widgets interface.',
      resolve: sidebar => sidebar.class,
    },
    before_widget: {
      type: GraphQLString,
      description: 'HTML content to prepend to each widget\'s HTML output when assigned to this sidebar.',
    },
    after_widget: {
      type: GraphQLString,
      description: 'HTML content to append to each widget\'s HTML output when assigned to this sidebar.',
    },
    before_title: {
      type: GraphQLString,
      description: 'HTML content to prepend to the sidebar title when displayed.',
    },
    after_title: {
      type: GraphQLString,
      description: 'HTML content to append to the sidebar title when displayed.',
    },
    widgets: {
      type: new GraphQLList(GraphQLString),
      description: 'HTML widgets associated with the sidebar.',
    },
    _links: { type: SidebarLinks },
  },
});

export default TypeType;
