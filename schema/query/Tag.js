import {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

import Tag from 'type/Tag';

import ORDER from 'enum/Order';
import TAXONOMY_ORDERBY from 'enum/TaxonomyOrderby';

import { resolveWithArgs, itemResolver } from 'utils';
import { tags } from 'data';

export default {
  tags: {
    type: new GraphQLList(Tag),
    args: {
      page: { type: GraphQLInt },
      per_page: { type: GraphQLInt },
      offset: { type: GraphQLInt },
      search: { type: GraphQLString },
      order: { type: ORDER },
      orderby: { type: TAXONOMY_ORDERBY },
      hide_empty: { type: GraphQLBoolean },
      post: { type: GraphQLInt },
      // value or comma-separated values
      include: { type: GraphQLString },
      exclude: { type: GraphQLString },
      slug: { type: GraphQLString },
    },
    resolve: resolveWithArgs('/tags'),
  },
  tag: itemResolver(Tag, tags),
};
