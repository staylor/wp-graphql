import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import { toGlobalId } from 'graphql-relay';

/* eslint-disable camelcase */

import PostType from 'type/Post';
import Avatar from 'type/User/Avatar';
import CommentLinks from 'type/Comment/Links';

import { globalIdField, link } from 'field/identifier';
import { content } from 'field/content';
import { date, date_gmt } from 'field/date';
import metaField from 'field/meta';
import author from 'field/author';

import Comment from 'data/Comment';
import Post from 'data/Post';

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'An object.',
  fields: () => ({
    id: globalIdField(),
    post: {
      type: PostType,
      resolve: comment => (
        comment.post > 0 ? Post.load(toGlobalId('Post', comment.post)) : null
      ),
    },
    parent: {
      type: CommentType,
      resolve: comment => (
        comment.parent > 0 ? Comment.load(toGlobalId('Comment', comment.parent)) : null
      ),
    },
    author,
    author_name: { type: GraphQLString },
    author_url: { type: GraphQLString },
    date,
    date_gmt,
    content,
    link,
    status: { type: GraphQLString },
    type: { type: GraphQLString },
    author_avatar_urls: {
      type: new GraphQLList(Avatar),
      resolve: (comment) => {
        Object.keys(comment.author_avatar_urls).map(key => ({
          size: key,
          url: comment.author_avatar_urls[key],
        }));
      },
    },
    meta: metaField(),
    _links: { type: CommentLinks },
  }),
});

export default CommentType;
