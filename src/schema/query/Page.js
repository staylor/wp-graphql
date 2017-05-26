import { GraphQLID, GraphQLInt, GraphQLString } from 'graphql';

import PAGE_ORDERBY from 'enum/PageOrderby';

import PageCollectionType from 'type/Page/Collection';
import PageType from 'type/Page';
import Page from 'data/Page';
import { pagination, filter, date, hierarchical, author, slug } from 'query/args';

export default {
  pages: {
    type: PageCollectionType,
    args: {
      ...pagination,
      ...filter,
      ...date,
      ...hierarchical,
      ...author,
      ...slug,
      menu_order: {
        type: GraphQLInt,
        description: 'Limit result set to posts with a specific menu_order value.',
      },
      orderby: { type: PAGE_ORDERBY },
    },
    resolve: (root, args) => ({ args }),
  },
  page: {
    type: PageType,
    args: {
      id: {
        type: GraphQLID,
        description: 'Unique identifier for the object.',
      },
      slug: {
        type: GraphQLString,
        description: 'Human-readable identifier for the object.',
      },
    },
    // eslint-disable-next-line no-confusing-arrow
    resolve: (root, { id, slug: name }) => (name ? Page.loadBySlug(name) : Page.load(id)),
  },
};
