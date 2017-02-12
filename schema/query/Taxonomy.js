import {
  GraphQLList,
  GraphQLString,
} from 'graphql';

import Taxonomy from 'type/Taxonomy';

import request, { taxonomies } from 'data';

export default {
  taxonomies: {
    type: new GraphQLList(Taxonomy),
    args: {
      type: { type: GraphQLString },
    },
    // eslint-disable-next-line no-confusing-arrow
    resolve: (root, { type }) => (
      request('/taxonomies', type ? { qs: { type } } : {}).then(taxMap => (
        Object.keys(taxMap).map(key => ({
          ...taxMap[key],
          type,
        }))
      ))
    ),
  },
  taxonomy: {
    type: Taxonomy,
    args: {
      type: { type: GraphQLString },
    },
    // eslint-disable-next-line no-confusing-arrow
    resolve: (root, { type }) => (
      taxonomies.load(type).then(taxData => ({
        ...taxData,
        type,
      }))
    ),
  },
};
