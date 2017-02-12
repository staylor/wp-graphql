import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import Post from 'type/Post';
import Content from 'type/Content';
import Meta from 'type/Meta';
import User from 'type/User';
import Avatar from 'type/User/Avatar';
import CommentLinks from 'type/Comment/Links';

import { posts, users, comments } from 'data';
import { metaResolver } from 'utils';

const Comment = new GraphQLObjectType({
  name: 'Comment',
  description: 'An object.',
  fields: () => ({
    id: { type: GraphQLInt },
    post: {
      type: Post,
      resolve: comment => (
        comment.post > 0 ? posts.load(comment.post) : null
      ),
    },
    parent: {
      type: Comment,
      resolve: comment => (
        comment.parent > 0 ? comments.load(comment.parent) : null
      ),
    },
    author: {
      type: User,
      resolve: comment => (
        comment.author > 0 ? users.load(comment.author) : null
      ),
    },
    author_name: { type: GraphQLString },
    author_url: { type: GraphQLString },
    date: { type: GraphQLString },
    date_gmt: { type: GraphQLString },
    content: { type: Content },
    link: { type: GraphQLString },
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
    meta: {
      type: new GraphQLList(Meta),
      resolve: metaResolver,
    },
    _links: { type: CommentLinks },
  }),
});

export default Comment;
