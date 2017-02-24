import TaxonomyCollectionType from 'type/Taxonomy/Collection';
import TaxonomyType from 'type/Taxonomy';
import Taxonomy from 'data/Taxonomy';
import { itemResolver } from 'utils';

export default {
  taxonomies: {
    type: TaxonomyCollectionType,
    resolve: (root, args) => ({ args }),
  },
  taxonomy: itemResolver(TaxonomyType, Taxonomy),
};
