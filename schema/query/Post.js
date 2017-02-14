import {
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import POST_ORDERBY from 'enum/PostOrderby';

import PostType from 'type/Post';
import Post from 'data/Post';
import { resolveWithArgs, itemResolver } from 'utils';
import { pagination, filter, date, author, slug } from 'query/args';

export default {
  posts: {
    type: new GraphQLList(PostType),
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
    resolve: resolveWithArgs('/posts', Post),
  },
  post: itemResolver(PostType, Post),
};
