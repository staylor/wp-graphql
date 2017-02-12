import {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

import Post from 'type/Post';

import ORDER from 'enum/Order';
import POST_ORDERBY from 'enum/PostOrderby';

import { resolveWithArgs, itemResolver } from 'utils';
import { posts } from 'data';

export default {
  posts: {
    type: new GraphQLList(Post),
    args: {
      page: { type: GraphQLInt },
      per_page: { type: GraphQLInt },
      offset: { type: GraphQLInt },
      search: { type: GraphQLString },
      order: { type: ORDER },
      orderby: { type: POST_ORDERBY },
      sticky: { type: GraphQLBoolean },
      // must be in format: 2017-02-11T00:00:00
      after: { type: GraphQLString },
      before: { type: GraphQLString },
      // value or comma-separated values
      author: { type: GraphQLString },
      author_exclude: { type: GraphQLString },
      include: { type: GraphQLString },
      exclude: { type: GraphQLString },
      slug: { type: GraphQLString },
      categories: { type: GraphQLString },
      categories_exclude: { type: GraphQLString },
      tags: { type: GraphQLString },
      tags_exclude: { type: GraphQLString },
    },
    resolve: resolveWithArgs('/posts'),
  },
  post: itemResolver(Post, posts),
};
