import {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

import Category from 'type/Category';

import ORDER from 'enum/Order';
import TAXONOMY_ORDERBY from 'enum/TaxonomyOrderby';

import { resolveWithArgs, itemResolver } from 'utils';
import { categories } from 'data';

export default {
  categories: {
    type: new GraphQLList(Category),
    args: {
      page: { type: GraphQLInt },
      per_page: { type: GraphQLInt },
      search: { type: GraphQLString },
      order: { type: ORDER },
      orderby: { type: TAXONOMY_ORDERBY },
      hide_empty: { type: GraphQLBoolean },
      parent: { type: GraphQLInt },
      post: { type: GraphQLInt },
      // value or comma-separated values
      include: { type: GraphQLString },
      exclude: { type: GraphQLString },
      slug: { type: GraphQLString },
    },
    resolve: resolveWithArgs('/categories'),
  },
  category: itemResolver(Category, categories),
};
