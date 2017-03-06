import { GraphQLList } from 'graphql';

import TaxonomyType from 'type/Taxonomy';
import Taxonomy from 'data/Taxonomy';
import { itemResolver } from 'utils';

export default {
  taxonomies: {
    description: 'List of taxonomies.',
    type: new GraphQLList(TaxonomyType),
    resolve: () => Taxonomy.collection(),
  },
  taxonomy: itemResolver(TaxonomyType, Taxonomy),
};
