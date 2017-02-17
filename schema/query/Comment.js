import { GraphQLInt } from 'graphql';

import COMMENT_ORDERBY from 'enum/CommentOrderby';

import CommentCollectionType from 'type/Comment/Collection';
import CommentType from 'type/Comment';
import Comment from 'data';
import { itemResolver } from 'utils';
import { pagination, filter, date, hierarchical } from 'query/args';

export default {
  comments: {
    type: CommentCollectionType,
    args: (
      Object.assign({}, pagination, filter, date, hierarchical, {
        post: {
          type: GraphQLInt,
          description: 'Limit result set to comments assigned to specific post IDs.',
        },
        orderby: { type: COMMENT_ORDERBY },
      })
    ),
    resolve: () => ({ results: [] }),
  },
  comment: itemResolver(CommentType, Comment),
};
