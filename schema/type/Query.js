import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import Post from './Post';
import User from './User';
import Category from './Category';
import request, {
  posts,
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
  }),
});

export default Query;
