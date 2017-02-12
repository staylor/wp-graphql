import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import TaxonomyLinks from 'type/Taxonomy/Links';

const Taxonomy = new GraphQLObjectType({
  name: 'Taxonomy',
  description: 'A taxonomy type.',
  fields: {
    type: { type: GraphQLString },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    description: { type: GraphQLString },
    types: { type: new GraphQLList(GraphQLString) },
    hierarchical: { type: GraphQLBoolean },
    rest_base: { type: GraphQLString },
    _links: { type: TaxonomyLinks },
  },
});

export default Taxonomy;
