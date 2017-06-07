import { GraphQLInt } from 'graphql';

import TaxonomyType from 'type/Taxonomy';
import Taxonomy from 'data/Taxonomy';

export default {
  taxonomy: {
    type: TaxonomyType,
    description: 'Type attribution for the term.',
    resolve: obj => Taxonomy.load(obj.taxonomy),
  },
  count: {
    type: GraphQLInt,
    description: 'Number of published posts for the term.',
  },
};
