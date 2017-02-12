import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import TaxonomyLinks from 'type/Taxonomy/Links';
import { slug, name } from 'field/identifier';
import description from 'field/description';

const Taxonomy = new GraphQLObjectType({
  name: 'Taxonomy',
  description: 'A taxonomy type.',
  fields: {
    type: { type: GraphQLString },
    name,
    slug,
    description,
    types: { type: new GraphQLList(GraphQLString) },
    hierarchical: { type: GraphQLBoolean },
    rest_base: { type: GraphQLString },
    _links: { type: TaxonomyLinks },
  },
});

export default Taxonomy;
