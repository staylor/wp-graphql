import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLBoolean } from 'graphql';

import TaxonomyLinks from 'type/Taxonomy/Links';

import { globalIdField, slug, name } from 'field/identifier';
import description from 'field/description';

const TaxonomyType = new GraphQLObjectType({
  name: 'Taxonomy',
  description: 'A taxonomy type.',
  fields: {
    id: globalIdField(),
    ...name,
    ...slug,
    ...description,
    types: {
      type: new GraphQLList(GraphQLString),
      description: 'Types associated with the taxonomy.',
    },
    hierarchical: {
      type: GraphQLBoolean,
      description: 'Whether or not the taxonomy should have children.',
    },
    rest_base: {
      type: GraphQLString,
      description: 'REST base route for the taxonomy.',
    },
    _links: { type: TaxonomyLinks },
  },
});

export default TaxonomyType;
