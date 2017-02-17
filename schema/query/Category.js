import { GraphQLInt } from 'graphql';

import CategoryCollectionType from 'type/Category/Collection';
import CategoryType from 'type/Category';
import Category from 'data/Category';
import { itemResolver } from 'utils';
import { pagination, filter, slug, taxonomy } from 'query/args';

export default {
  categories: {
    type: CategoryCollectionType,
    args: (
      Object.assign({}, pagination, filter, slug, taxonomy, {
        parent: {
          type: GraphQLInt,
          description: 'Limit result set to terms assigned to a specific parent.',
        },
      })
    ),
    resolve: () => ({ results: [] }),
  },
  category: itemResolver(CategoryType, Category),
};
