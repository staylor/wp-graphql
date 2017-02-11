import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
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

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    posts: {
      type: new GraphQLList(Post),
      resolve: () => request('/posts'),
    },
    post: {
      type: Post,
      args: {
        id: { type: GraphQLInt },
      },
      // eslint-disable-next-line no-confusing-arrow
      resolve: (root, { id }) => posts.load(id),
    },
    users: {
      type: new GraphQLList(User),
      resolve: () => request('/users'),
    },
    user: {
      type: User,
      args: {
        id: { type: GraphQLInt },
      },
      // eslint-disable-next-line no-confusing-arrow
      resolve: (root, { id }) => users.load(id),
    },
    categories: {
      type: new GraphQLList(Category),
      resolve: () => request('/categories'),
    },
    category: {
      type: Category,
      args: {
        id: { type: GraphQLInt },
      },
      // eslint-disable-next-line no-confusing-arrow
      resolve: (root, { id }) => categories.load(id),
    },
    tags: {
      type: new GraphQLList(Tag),
      resolve: () => request('/tags'),
    },
    tag: {
      type: Tag,
      args: {
        id: { type: GraphQLInt },
      },
      // eslint-disable-next-line no-confusing-arrow
      resolve: (root, { id }) => tags.load(id),
    },
    pages: {
      type: new GraphQLList(Page),
      resolve: () => request('/pages'),
    },
    page: {
      type: Page,
      args: {
        id: { type: GraphQLInt },
      },
      // eslint-disable-next-line no-confusing-arrow
      resolve: (root, { id }) => pages.load(id),
    },
  }),
});

export default Query;
