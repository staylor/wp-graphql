import {
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import PAGE_ORDERBY from 'enum/PageOrderby';

import PageType from 'type/Page';
import Page from 'data/Page';
import { resolveWithArgs, itemResolver } from 'utils';
import { pagination, filter, date, hierarchical, author, slug } from 'query/args';

export default {
  pages: {
    type: new GraphQLList(PageType),
    args: (
      Object.assign({}, pagination, filter, date, hierarchical, author, slug, {
        menu_order: {
          type: GraphQLInt,
          description: 'Limit result set to posts with a specific menu_order value.',
        },
        orderby: { type: PAGE_ORDERBY },
      })
    ),
    resolve: resolveWithArgs('/pages', Page),
  },
  page: itemResolver(PageType, Page),
};
