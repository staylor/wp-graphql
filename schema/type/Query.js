import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

import Post from 'type/Post';
import Comment from 'type/Comment';
import User from 'type/User';
import Category from 'type/Category';
import Tag from 'type/Tag';
import Page from 'type/Page';
import Status from 'type/Status';
import Type from 'type/Type';
import Taxonomy from 'type/Taxonomy';
import Media from 'type/Media';

import ORDER from 'enum/Order';
import POST_ORDERBY from 'enum/PostOrderby';
import PAGE_ORDERBY from 'enum/PageOrderby';
import TAXONOMY_ORDERBY from 'enum/TaxonomyOrderby';
import COMMENT_ORDERBY from 'enum/CommentOrderby';
import USER_ORDERBY from 'enum/UserOrderby';
import MEDIA_TYPE from 'enum/MediaType';

import request, {
  posts,
  pages,
  users,
  categories,
  tags,
  statuses,
  types,
  taxonomies,
  comments,
  media,
} from 'data';

import { resolveWithArgs, itemResolver } from 'utils';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
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
    users: {
      type: new GraphQLList(User),
      args: {
        page: { type: GraphQLInt },
        per_page: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        search: { type: GraphQLString },
        order: { type: ORDER },
        orderby: { type: USER_ORDERBY },
        include: { type: GraphQLString },
        exclude: { type: GraphQLString },
        slug: { type: GraphQLString },
        roles: { type: GraphQLString },
      },
      resolve: resolveWithArgs('/users'),
    },
    user: itemResolver(User, users),
    categories: {
      type: new GraphQLList(Category),
      args: {
        page: { type: GraphQLInt },
        per_page: { type: GraphQLInt },
        search: { type: GraphQLString },
        order: { type: ORDER },
        orderby: { type: TAXONOMY_ORDERBY },
        hide_empty: { type: GraphQLBoolean },
        parent: { type: GraphQLInt },
        post: { type: GraphQLInt },
        // value or comma-separated values
        include: { type: GraphQLString },
        exclude: { type: GraphQLString },
        slug: { type: GraphQLString },
      },
      resolve: resolveWithArgs('/categories'),
    },
    category: itemResolver(Category, categories),
    tags: {
      type: new GraphQLList(Tag),
      args: {
        page: { type: GraphQLInt },
        per_page: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        search: { type: GraphQLString },
        order: { type: ORDER },
        orderby: { type: TAXONOMY_ORDERBY },
        hide_empty: { type: GraphQLBoolean },
        post: { type: GraphQLInt },
        // value or comma-separated values
        include: { type: GraphQLString },
        exclude: { type: GraphQLString },
        slug: { type: GraphQLString },
      },
      resolve: resolveWithArgs('/tags'),
    },
    tag: itemResolver(Tag, tags),
    pages: {
      type: new GraphQLList(Page),
      args: {
        page: { type: GraphQLInt },
        per_page: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        menu_order: { type: GraphQLInt },
        search: { type: GraphQLString },
        order: { type: ORDER },
        orderby: { type: PAGE_ORDERBY },
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
        parent: { type: GraphQLString },
        parent_exclude: { type: GraphQLString },
      },
      resolve: resolveWithArgs('/pages'),
    },
    page: itemResolver(Page, pages),
    comments: {
      type: new GraphQLList(Comment),
      args: {
        page: { type: GraphQLInt },
        per_page: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        post: { type: GraphQLInt },
        search: { type: GraphQLString },
        order: { type: ORDER },
        orderby: { type: COMMENT_ORDERBY },
        // must be in format: 2017-02-11T00:00:00
        after: { type: GraphQLString },
        before: { type: GraphQLString },
        // value or comma-separated values
        include: { type: GraphQLString },
        exclude: { type: GraphQLString },
        parent: { type: GraphQLString },
        parent_exclude: { type: GraphQLString },
      },
      resolve: resolveWithArgs('/comments'),
    },
    comment: itemResolver(Comment, comments),
    types: {
      type: new GraphQLList(Type),
      resolve: () => (
        request('/types').then(typeMap => (
          Object.keys(typeMap).map(type => ({
            ...typeMap[type],
            type,
          }))
        ))
      ),
    },
    type: {
      type: Type,
      args: {
        type: { type: GraphQLString },
      },
      // eslint-disable-next-line no-confusing-arrow
      resolve: (root, { type }) => (
        types.load(type).then(typeData => ({
          ...typeData,
          type,
        }))
      ),
    },
    taxonomies: {
      type: new GraphQLList(Taxonomy),
      args: {
        type: { type: GraphQLString },
      },
      // eslint-disable-next-line no-confusing-arrow
      resolve: (root, { type }) => (
        request('/taxonomies', type ? { qs: { type } } : {}).then(taxMap => (
          Object.keys(taxMap).map(key => ({
            ...taxMap[key],
            type,
          }))
        ))
      ),
    },
    taxonomy: {
      type: Taxonomy,
      args: {
        type: { type: GraphQLString },
      },
      // eslint-disable-next-line no-confusing-arrow
      resolve: (root, { type }) => (
        taxonomies.load(type).then(taxData => ({
          ...taxData,
          type,
        }))
      ),
    },
    media: {
      type: new GraphQLList(Media),
      args: {
        page: { type: GraphQLInt },
        per_page: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        search: { type: GraphQLString },
        order: { type: ORDER },
        orderby: { type: POST_ORDERBY },
        media_type: { type: MEDIA_TYPE },
        mime_type: { type: GraphQLString },
        // must be in format: 2017-02-11T00:00:00
        after: { type: GraphQLString },
        before: { type: GraphQLString },
        // value or comma-separated values
        author: { type: GraphQLString },
        author_exclude: { type: GraphQLString },
        parent: { type: GraphQLString },
        parent_exclude: { type: GraphQLString },
        include: { type: GraphQLString },
        exclude: { type: GraphQLString },
        slug: { type: GraphQLString },
      },
      resolve: resolveWithArgs('/media'),
    },
    medium: itemResolver(Media, media),
    statuses: {
      type: new GraphQLList(Status),
      resolve: () => (
        request('/statuses').then(stati => (
          Object.keys(stati).map(status => ({
            ...stati[status],
            type: status,
          }))
        ))
      ),
    },
    status: {
      type: Status,
      args: {
        type: { type: GraphQLString },
      },
      // eslint-disable-next-line no-confusing-arrow
      resolve: (root, { type }) => (
        statuses.load(type).then(statusData => ({
          ...statusData,
          type,
        }))
      ),
    },
  }),
});

export default Query;
