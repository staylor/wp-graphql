import {
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import POST_ORDERBY from 'enum/PostOrderby';

import PostType from 'type/Post';
import PostCollectonType from 'type/Post/Collection';
import Post from 'data/Post';
import { itemResolver } from 'utils';
import { pagination, filter, date, author, slug } from 'query/args';

export default {
  posts: {
    type: PostCollectonType,
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
    resolve: () => ({ results: [] }),
  },
  post: itemResolver(PostType, Post),
};
