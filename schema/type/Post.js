import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import Guid from './Guid';
import Title from './Title';
import Content from './Content';
import Excerpt from './Excerpt';
import Meta from './Meta';
import Links from './Links';

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'An object.',
  fields: {
    id: { type: GraphQLInt },
    date: { type: GraphQLString },
    date_gmt: { type: GraphQLString },
    guid: { type: Guid },
    modified: { type: GraphQLString },
    modified_gmt: { type: GraphQLString },
    slug: { type: GraphQLString },
    type: { type: GraphQLString },
    link: { type: GraphQLString },
    title: { type: Title },
    content: { type: Content },
    excerpt: { type: Excerpt },
    author: { type: GraphQLInt },
    featured_media: { type: GraphQLInt },
    comment_status: { type: GraphQLString },
    ping_status: { type: GraphQLString },
    sticky: { type: GraphQLBoolean },
    template: { type: GraphQLString },
    format: { type: GraphQLString },
    meta: {
      type: new GraphQLList(Meta),
      resolve: (post) => {
        if (!post.meta || !post.meta.length) {
          return null;
        }
        return Object.keys(post.meta).map(key => ({
          key,
          value: post.meta[key],
        }));
      },
    },
    categories: { type: new GraphQLList(GraphQLInt) },
    tags: { type: new GraphQLList(GraphQLInt) },
    _links: { type: Links },
  },
});

export default Post;
