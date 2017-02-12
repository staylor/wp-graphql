import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import PostInterface from 'interface/Post';
import Title from 'type/Title';
import Content from 'type/Content';
import Excerpt from 'type/Excerpt';
import User from 'type/User';
import Category from 'type/Category';
import Tag from 'type/Tag';
import Media from 'type/Media';
import PostLinks from 'type/Post/Links';
import { id, slug, guid } from 'field/identifier';
// eslint-disable-next-line camelcase
import { date, date_gmt, modified, modified_gmt } from 'field/date';
import metaField from 'field/meta';
// eslint-disable-next-line camelcase
import { comment_status, ping_status } from 'field/status';
import { categories, tags, users, media } from 'data';

import FORMAT from 'enum/Format';

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'A read-only post object.',
  interfaces: [PostInterface],
  isTypeOf(post) {
    return post.type === 'post';
  },
  fields: {
    id,
    date,
    date_gmt,
    guid,
    modified,
    modified_gmt,
    slug,
    type: { type: GraphQLString },
    link: { type: GraphQLString },
    title: { type: Title },
    content: { type: Content },
    excerpt: { type: Excerpt },
    comment_status,
    ping_status,
    template: { type: GraphQLString },
    format: { type: FORMAT },
    meta: metaField(),
    author: {
      type: User,
      resolve: post => (
        post.author > 0 ? users.load(post.author) : null
      ),
    },
    featured_media: {
      type: Media,
      resolve: post => (
        post.featured_media ? media.load(post.featured_media) : null
      ),
    },
    _links: { type: PostLinks },
    // extra post fields
    sticky: { type: GraphQLBoolean },
    categories: {
      type: new GraphQLList(Category),
      resolve: post => (
        post.categories.length ?
          categories.loadMany(post.categories) :
          []
      ),
    },
    tags: {
      type: new GraphQLList(Tag),
      resolve: post => (
        post.tags.length ?
          tags.loadMany(post.tags) :
          []
      ),
    },
  },
});

export default Post;
