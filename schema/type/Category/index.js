import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import TermInterface from 'interface/Term';
import CategoryLinks from 'type/Category/Links';
import description from 'field/description';
import metaField from 'field/meta';
import { id, slug, name } from 'field/identifier';
import { categories } from 'data';

const Category = new GraphQLObjectType({
  name: 'Category',
  description: 'A unique identifier for a post.',
  interfaces: [TermInterface],
  isTypeOf(term) {
    return term.taxonomy === 'category';
  },
  fields: () => ({
    id,
    count: { type: GraphQLInt },
    description,
    link: { type: GraphQLString },
    name,
    slug,
    taxonomy: { type: GraphQLString },
    meta: metaField(),
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
