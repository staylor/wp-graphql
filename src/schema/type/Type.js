import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLBoolean } from 'graphql';
import { globalIdField } from 'field/identifier';
import description from 'field/description';
import LabelsType from 'type/Labels';

const TypeType = new GraphQLObjectType({
  name: 'Type',
  description: 'A post type.',
  fields: {
    id: globalIdField(),
    ...description,
    name: {
      type: GraphQLString,
      description: 'Identifier for the object.',
      resolve: item => item.slug,
    },
    hierarchical: {
      type: GraphQLBoolean,
      description: 'Whether or not the post type should have children.',
    },
    taxonomies: {
      type: new GraphQLList(GraphQLString),
      description: 'Taxonomies associated with post type.',
    },
    labels: {
      type: LabelsType,
    },
  },
});

export default TypeType;
