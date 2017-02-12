import {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import Comment from 'type/Comment';

import ORDER from 'enum/Order';
import COMMENT_ORDERBY from 'enum/CommentOrderby';

import { resolveWithArgs, itemResolver } from 'utils';
import { comments } from 'data';

export default {
  comments: {
    type: new GraphQLList(Comment),
    args: {
      page: { type: GraphQLInt },
      per_page: { type: GraphQLInt },
      offset: { type: GraphQLInt },
      post: { type: GraphQLInt },
      search: { type: GraphQLString },
      order: { type: ORDER },
      orderby: { type: COMMENT_ORDERBY },
      // must be in format: 2017-02-11T00:00:00
      after: { type: GraphQLString },
      before: { type: GraphQLString },
      // value or comma-separated values
      include: { type: GraphQLString },
      exclude: { type: GraphQLString },
      parent: { type: GraphQLString },
      parent_exclude: { type: GraphQLString },
    },
    resolve: resolveWithArgs('/comments'),
  },
  comment: itemResolver(Comment, comments),
};
