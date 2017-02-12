import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import TermInterface from 'interface/Term';
import Meta from 'type/Meta';
import CategoryLinks from 'type/Category/Links';
import { categories } from 'data';
import { metaResolver } from 'utils';

const Category = new GraphQLObjectType({
  name: 'Category',
  description: 'A unique identifier for a post.',
  interfaces: [TermInterface],
  isTypeOf(term) {
    return term.taxonomy === 'category';
  },
  fields: () => ({
    id: { type: GraphQLInt },
    count: { type: GraphQLInt },
    description: { type: GraphQLString },
    link: { type: GraphQLString },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    taxonomy: { type: GraphQLString },
    meta: {
      type: new GraphQLList(Meta),
      resolve: metaResolver,
    },
    _links: { type: CategoryLinks },
    // extra category fields
    parent: {
      type: Category,
      resolve: category => (
        category.parent > 0 ? categories.load(category.parent) : null
      ),
    },
  }),
});

export default Category;
