import {
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import COMMENT_ORDERBY from 'enum/CommentOrderby';

import CommentType from 'type/Comment';
import Comment from 'data';
import { resolveWithArgs, itemResolver } from 'utils';
import { pagination, filter, date, hierarchical } from 'query/args';

export default {
  comments: {
    type: new GraphQLList(CommentType),
    args: (
      Object.assign({}, pagination, filter, date, hierarchical, {
        post: {
          type: GraphQLInt,
          description: 'Limit result set to comments assigned to specific post IDs.',
        },
        orderby: { type: COMMENT_ORDERBY },
      })
    ),
    resolve: resolveWithArgs('/comments', Comment),
  },
  comment: itemResolver(CommentType, Comment),
};
