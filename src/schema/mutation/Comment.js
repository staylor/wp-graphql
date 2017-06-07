import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import Comment from 'data/Comment';
import CommentType from 'type/Comment';

const requiredFields = {
  author_email: {
    type: new GraphQLNonNull(GraphQLString),
  },
  author_name: {
    type: new GraphQLNonNull(GraphQLString),
  },
  content: {
    type: new GraphQLNonNull(GraphQLString),
  },
  post: {
    type: new GraphQLNonNull(GraphQLID),
  },
};

const createCommentMutation = (opts = {}) =>
  mutationWithClientMutationId(
    Object.assign(
      {},
      {
        name: '<FixMe>',
        inputFields: {
          ...requiredFields,
        },
        outputFields: {
          status: {
            type: GraphQLString,
          },
          comment: {
            type: CommentType,
          },
          cookies: {
            type: GraphQLString,
          },
        },
        mutateAndGetPayload: payload => ({
          comment: payload,
          status: '<FixMe>',
          cookies: '<FixMe>',
        }),
      },
      opts
    )
  );

export default {
  addComment: createCommentMutation({
    name: 'AddComment',
    inputFields: {
      ...requiredFields,
      author_url: {
        type: GraphQLString,
      },
      parent: {
        type: GraphQLID,
      },
    },
    mutateAndGetPayload: input => Comment.create(input),
  }),
  updateComment: createCommentMutation({
    name: 'UpdateComment',
    inputFields: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      content: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    mutateAndGetPayload: input => Comment.update(input),
  }),
  deleteComment: createCommentMutation({
    name: 'DeleteComment',
    inputFields: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    outputFields: {
      status: {
        type: GraphQLString,
      },
    },
    mutateAndGetPayload: input => Comment.delete(input),
  }),
};
