import {
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import COMMENT_ORDERBY from 'enum/CommentOrderby';

import Comment from 'type/Comment';
import { resolveWithArgs, itemResolver } from 'utils';
import { comments } from 'data';
import { pagination, filter, date, hierarchical } from 'query/args';

export default {
  comments: {
    type: new GraphQLList(Comment),
    args: (
      Object.assign({}, pagination, filter, date, hierarchical, {
        post: {
          type: GraphQLInt,
          description: 'Limit result set to comments assigned to specific post IDs.',
        },
        orderby: { type: COMMENT_ORDERBY },
      })
    ),
    resolve: resolveWithArgs('/comments'),
  },
  comment: itemResolver(Comment, comments),
};
