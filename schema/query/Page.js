import {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

import Page from 'type/Page';

import ORDER from 'enum/Order';
import PAGE_ORDERBY from 'enum/PageOrderby';

import { resolveWithArgs, itemResolver } from 'utils';
import { pages } from 'data';

export default {
  pages: {
    type: new GraphQLList(Page),
    args: {
      page: { type: GraphQLInt },
      per_page: { type: GraphQLInt },
      offset: { type: GraphQLInt },
      menu_order: { type: GraphQLInt },
      search: { type: GraphQLString },
      order: { type: ORDER },
      orderby: { type: PAGE_ORDERBY },
      sticky: { type: GraphQLBoolean },
      // must be in format: 2017-02-11T00:00:00
      after: { type: GraphQLString },
      before: { type: GraphQLString },
      // value or comma-separated values
      author: { type: GraphQLString },
      author_exclude: { type: GraphQLString },
      include: { type: GraphQLString },
      exclude: { type: GraphQLString },
      slug: { type: GraphQLString },
      parent: { type: GraphQLString },
      parent_exclude: { type: GraphQLString },
    },
    resolve: resolveWithArgs('/pages'),
  },
  page: itemResolver(Page, pages),
};
