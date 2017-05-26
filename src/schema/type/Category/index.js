import { GraphQLObjectType } from 'graphql';
import { toGlobalId } from 'graphql-relay';

import TermInterface from 'interface/Term';
import CategoryLinks from 'type/Category/Links';
import description from 'field/description';
import metaField from 'field/meta';
import { globalIdField, slug, name, link } from 'field/identifier';
import taxonomy from 'field/taxonomy';
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
    ...description,
    ...link,
    ...name,
    ...slug,
    ...taxonomy,
    meta: metaField(),
    _links: { type: CategoryLinks },
    // extra category fields
    parent: {
      type: CategoryType,
      description: 'The parent term ID.',
      // eslint-disable-next-line no-confusing-arrow
      resolve: category =>
        category.parent > 0 ? Category.load(toGlobalId('Category', category.parent)) : null,
    },
  }),
});

export default CategoryType;
