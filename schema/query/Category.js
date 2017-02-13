import {
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import Category from 'type/Category';
import { resolveWithArgs, itemResolver } from 'utils';
import { categories } from 'data';
import { pagination, filter, slug, taxonomy } from 'query/args';

export default {
  categories: {
    type: new GraphQLList(Category),
    args: (
      Object.assign({}, pagination, filter, slug, taxonomy, {
        parent: {
          type: GraphQLInt,
          description: 'Limit result set to terms assigned to a specific parent.',
        },
      })
    ),
    resolve: resolveWithArgs('/categories'),
  },
  category: itemResolver(Category, categories),
};
