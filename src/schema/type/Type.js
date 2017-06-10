import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLBoolean } from 'graphql';

import { globalIdField, slug, name } from 'field/identifier';
import description from 'field/description';

const TypeType = new GraphQLObjectType({
  name: 'Type',
  description: 'A post type.',
  fields: {
    id: globalIdField(),
    ...description,
    ...name,
    ...slug,
    hierarchical: {
      type: GraphQLBoolean,
      description: 'Whether or not the post type should have children.',
    },
    taxonomies: {
      type: new GraphQLList(GraphQLString),
      description: 'Taxonomies associated with post type.',
    },
    rest_base: {
      type: GraphQLString,
      description: 'REST base route for the post type.',
    },
  },
});

export default TypeType;
