import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import CommentType from 'type/Comment';
import Comment from 'data/Comment';
import { mutationWithClientMutationId } from './utils';

const inputs = {
  author: {
    type: GraphQLInt,
  },
  author_email: {
    type: GraphQLString,
  },
  author_name: {
    type: GraphQLString,
  },
  content: {
    type: new GraphQLNonNull(GraphQLString),
  },
  parent: {
    type: GraphQLInt,
  },
  post: {
    type: new GraphQLNonNull(GraphQLInt),
  },
};

const createCommentMutation = (opts = {}) => (
  mutationWithClientMutationId(Object.assign({}, {
    name: '<FixMe>',
    inputFields: {
      ...inputs,
    },
    outputFields: {
      status: {
        type: GraphQLString,
      },
      comment: {
        type: CommentType,
        resolve: payload => payload.comment,
      },
    },
    mutateAndGetPayload: payload => ({
      comment: payload,
      status: '<FixMe>',
    }),
  }, opts))
);

export default {
  addComment: createCommentMutation({
    name: 'AddComment',
    mutateAndGetPayload: async input => Comment.create(input),
  }),
  updateComment: createCommentMutation({
    name: 'UpdateComment',
    inputFields: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      ...inputs,
    },
    mutateAndGetPayload: async input => Comment.update(input),
  }),
};
