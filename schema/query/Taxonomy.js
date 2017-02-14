import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import TaxonomyType from 'type/Taxonomy';
import Taxonomy from 'data/Taxonomy';
import request from 'data';

export default {
  taxonomies: {
    type: new GraphQLList(TaxonomyType),
    // eslint-disable-next-line no-confusing-arrow
    resolve: () => (
      request('/taxonomies').then(taxMap => (
        Object.keys(taxMap).map(tax => (Object.assign(new Taxonomy(), {
          ...taxMap[tax],
          id: tax,
        })))
      ))
    ),
  },
  taxonomy: {
    type: TaxonomyType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'Unique identifier for the object.',
      },
    },
    // eslint-disable-next-line no-confusing-arrow
    resolve: (root, { id }) => (
      Taxonomy.load(id).then(taxData => (Object.assign(new Taxonomy(), {
        ...taxData,
        id,
      })))
    ),
  },
};
