import {
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import PAGE_ORDERBY from 'enum/PageOrderby';

import Page from 'type/Page';
import { resolveWithArgs, itemResolver } from 'utils';
import { pages } from 'data';
import { pagination, filter, date, hierarchical, author, slug } from 'query/args';

export default {
  pages: {
    type: new GraphQLList(Page),
    args: (
      Object.assign({}, pagination, filter, date, hierarchical, author, slug, {
        menu_order: { type: GraphQLInt },
        orderby: { type: PAGE_ORDERBY },
      })
    ),
    resolve: resolveWithArgs('/pages'),
  },
  page: itemResolver(Page, pages),
};
