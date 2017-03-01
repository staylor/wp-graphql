import { GraphQLString, GraphQLInt } from 'graphql';

import POST_ORDERBY from 'enum/PostOrderby';

import PostCollectonType from 'type/Post/Collection';
import PostType from 'type/Post';
import Post from 'data/Post';
import { itemResolver } from 'utils';
import { pagination, filter, date, author, slug } from 'query/args';

export default {
  posts: {
    type: PostCollectonType,
    args: {
      ...pagination,
      ...filter,
      ...date,
      ...author,
      ...slug,
      orderby: { type: POST_ORDERBY },
      // value or comma-separated values
      categories: { type: GraphQLString },
      categories_exclude: { type: GraphQLString },
      tags: { type: GraphQLString },
      tags_exclude: { type: GraphQLString },
      year: { type: GraphQLInt },
    },
    resolve: (root, args) => ({
      args: {
        ...args,
        sticky: false,
      },
    }),
  },
  stickies: {
    type: PostCollectonType,
    args: {
      ...pagination,
      ...filter,
      ...date,
      ...author,
      ...slug,
      orderby: { type: POST_ORDERBY },
      // value or comma-separated values
      categories: { type: GraphQLString },
      categories_exclude: { type: GraphQLString },
      tags: { type: GraphQLString },
      tags_exclude: { type: GraphQLString },
    },
    resolve: (root, args) => ({
      args: {
        ...args,
        sticky: true,
      },
    }),
  },
  post: itemResolver(PostType, Post),
};
