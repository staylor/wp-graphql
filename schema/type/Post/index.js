import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import Guid from 'type/Guid';
import Title from 'type/Title';
import Content from 'type/Content';
import Excerpt from 'type/Excerpt';
import Meta from 'type/Meta';
import User from 'type/User';
import Category from 'type/Category';
import Tag from 'type/Tag';
import Media from 'type/Media';
import PostLinks from 'type/Post/Links';

import {
  categories,
  tags,
  users,
  media,
} from 'data';
import { metaResolver } from 'utils';

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
    author: {
      type: User,
      resolve: post => users.load(post.author),
    },
    featured_media: {
      type: Media,
      resolve: post => (
        post.featured_media ? media.load(post.featured_media) : null
      ),
    },
    comment_status: { type: GraphQLString },
    ping_status: { type: GraphQLString },
    sticky: { type: GraphQLBoolean },
    template: { type: GraphQLString },
    format: { type: GraphQLString },
    meta: {
      type: new GraphQLList(Meta),
      resolve: metaResolver,
    },
    categories: {
      type: new GraphQLList(Category),
      resolve: post => categories.loadMany(post.categories),
    },
    tags: {
      type: new GraphQLList(Tag),
      resolve: post => tags.loadMany(post.tags),
    },
    _links: { type: PostLinks },
  },
});

export default Post;
