import {
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import POST_ORDERBY from 'enum/PostOrderby';

import Post from 'type/Post';
import { resolveWithArgs, itemResolver } from 'utils';
import { posts } from 'data';
import { pagination, filter, date, author, slug } from 'query/args';

export default {
  posts: {
    type: new GraphQLList(Post),
    args: (
      Object.assign({}, pagination, filter, date, author, slug, {
        orderby: { type: POST_ORDERBY },
        sticky: { type: GraphQLBoolean },
        // value or comma-separated values
        categories: { type: GraphQLString },
        categories_exclude: { type: GraphQLString },
        tags: { type: GraphQLString },
        tags_exclude: { type: GraphQLString },
      })
    ),
    resolve: resolveWithArgs('/posts'),
  },
  post: itemResolver(Post, posts),
};
