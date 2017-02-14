import {
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import CategoryType from 'type/Category';
import Category from 'data/Category';
import { resolveWithArgs, itemResolver } from 'utils';
import { pagination, filter, slug, taxonomy } from 'query/args';

export default {
  categories: {
    type: new GraphQLList(CategoryType),
    args: (
      Object.assign({}, pagination, filter, slug, taxonomy, {
        parent: {
          type: GraphQLInt,
          description: 'Limit result set to terms assigned to a specific parent.',
        },
      })
    ),
    resolve: resolveWithArgs('/categories', Category),
  },
  category: itemResolver(CategoryType, Category),
};
