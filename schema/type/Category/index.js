import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import { toGlobalId } from 'graphql-relay';

import TermInterface from 'interface/Term';
import CategoryLinks from 'type/Category/Links';
import description from 'field/description';
import metaField from 'field/meta';
import { globalIdField, slug, name, link } from 'field/identifier';
import Category from 'data/Category';

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'A unique identifier for a post.',
  interfaces: [TermInterface],
  isTypeOf(term) {
    return term.taxonomy === 'category';
  },
  fields: () => ({
    id: globalIdField(),
    count: { type: GraphQLInt },
    description,
    link,
    name,
    slug,
    taxonomy: { type: GraphQLString },
    meta: metaField(),
    _links: { type: CategoryLinks },
    // extra category fields
    parent: {
      type: CategoryType,
      resolve: category => (
        category.parent > 0 ?
          Category.load(toGlobalId('Category', category.parent)) :
          null
      ),
    },
  }),
});

export default CategoryType;
