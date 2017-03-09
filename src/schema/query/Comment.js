import { GraphQLID } from 'graphql';

import COMMENT_ORDERBY from 'enum/CommentOrderby';

import CommentCollectionType from 'type/Comment/Collection';
import CommentType from 'type/Comment';
import Comment from 'data/Comment';
import { itemResolver } from 'utils';
import { pagination, filter, date, hierarchical } from 'query/args';

export default {
  comments: {
    type: CommentCollectionType,
    args: {
      ...pagination,
      ...filter,
      ...date,
      ...hierarchical,
      post: {
        type: GraphQLID,
        description: 'Limit result set to comments assigned to specific post IDs.',
      },
      orderby: { type: COMMENT_ORDERBY },
    },
    resolve: (root, args) => ({ args }),
  },
  comment: itemResolver(CommentType, Comment),
};
