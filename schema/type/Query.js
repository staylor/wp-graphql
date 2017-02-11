import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import Post from './Post';
import User from './User';
import Category from './Category';
import Tag from './Tag';
import Page from './Page';
import request, {
  posts,
  pages,
  users,
  categories,
  tags,
} from '../../data';

import { itemResolver } from '../utils';

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
  }),
});

export default Query;
