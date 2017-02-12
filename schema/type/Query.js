import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import Post from 'type/Post';
import User from 'type/User';
import Category from 'type/Category';
import Tag from 'type/Tag';
import Page from 'type/Page';
import Status from 'type/Status';
import Type from 'type/Type';
import request, {
  posts,
  pages,
  users,
  categories,
  tags,
  statuses,
  types,
} from 'data';

import { itemResolver } from 'utils';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    posts: {
      type: new GraphQLList(Post),
      resolve: () => request('/posts'),
    },
    post: itemResolver(Post, posts),
    users: {
      type: new GraphQLList(User),
      resolve: () => request('/users'),
    },
    user: itemResolver(User, users),
    categories: {
      type: new GraphQLList(Category),
      resolve: () => request('/categories'),
    },
    category: itemResolver(Category, categories),
    tags: {
      type: new GraphQLList(Tag),
      resolve: () => request('/tags'),
    },
    tag: itemResolver(Tag, tags),
    pages: {
      type: new GraphQLList(Page),
      resolve: () => request('/pages'),
    },
    page: itemResolver(Page, pages),
    types: {
      type: new GraphQLList(Type),
      resolve: () => (
        request('/types').then(typeMap => (
          Object.keys(typeMap).map(type => ({
            ...typeMap[type],
            type,
          }))
        ))
      ),
    },
    type: {
      type: Type,
      args: {
        type: { type: GraphQLString },
      },
      // eslint-disable-next-line no-confusing-arrow
      resolve: (root, { type }) => types.load(type),
    },
    statuses: {
      type: new GraphQLList(Status),
      resolve: () => (
        request('/statuses').then(stati => (
          Object.keys(stati).map(status => ({
            ...stati[status],
            type: status,
          }))
        ))
      ),
    },
    status: {
      type: Status,
      args: {
        type: { type: GraphQLString },
      },
      // eslint-disable-next-line no-confusing-arrow
      resolve: (root, { type }) => statuses.load(type),
    },
  }),
});

export default Query;
