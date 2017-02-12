import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Meta from 'type/Meta';
import CategoryLinks from 'type/Category/Links';

import { categories } from 'data';
import { metaResolver } from 'utils';

const Category = new GraphQLObjectType({
  name: 'Category',
  description: 'A unique identifier for a post.',
  fields: () => ({
    id: { type: GraphQLInt },
    count: { type: GraphQLInt },
    description: { type: GraphQLString },
    link: { type: GraphQLString },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    taxonomy: { type: GraphQLString },
    parent: {
      type: Category,
      resolve: category => (
        category.parent > 0 ? categories.load(category.parent) : null
      ),
    },
    meta: {
      type: new GraphQLList(Meta),
      resolve: metaResolver,
    },
    _links: { type: CategoryLinks },
  }),
});

export default Category;
