import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

/* eslint-disable camelcase */

import PostInterface from 'interface/Post';
import Category from 'type/Category';
import Tag from 'type/Tag';
import PostLinks from 'type/Post/Links';

import { id, slug, guid, link } from 'field/identifier';
import { title, content, excerpt } from 'field/content';
import { date, date_gmt, modified, modified_gmt } from 'field/date';
import { comment_status, ping_status } from 'field/status';
import { type, template, format, sticky } from 'field/post';
import { featuredMedia } from 'field/media';
import metaField from 'field/meta';
import author from 'field/author';

import { categories, tags } from 'data';

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
    type,
    link,
    title,
    content,
    excerpt,
    comment_status,
    ping_status,
    template,
    format,
    meta: metaField(),
    author,
    featured_media: featuredMedia(),
    _links: { type: PostLinks },
    // extra post fields
    sticky,
    categories: {
      type: new GraphQLList(Category),
      description: 'The terms assigned to the object in the category taxonomy.',
      resolve: post => (
        post.categories.length ?
          categories.loadMany(post.categories) :
          []
      ),
    },
    tags: {
      type: new GraphQLList(Tag),
      description: 'The terms assigned to the object in the post_tag taxonomy.',
      resolve: post => (
        post.tags.length ?
          tags.loadMany(post.tags) :
          []
      ),
    },
  },
});

export default Post;
