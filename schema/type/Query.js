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

import ORDER from 'type/Order';
import ORDERBY from 'type/Orderby';

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
        orderby: { type: ORDERBY },
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
        sticky: { type: GraphQLBoolean },
      },
      resolve: resolveWithArgs('/posts'),
    },
    post: itemResolver(Post, posts),
    users: {
      type: new GraphQLList(User),
      resolve: resolveWithArgs('/users'),
    },
    user: itemResolver(User, users),
    categories: {
      type: new GraphQLList(Category),
      resolve: resolveWithArgs('/categories'),
    },
    category: itemResolver(Category, categories),
    tags: {
      type: new GraphQLList(Tag),
      resolve: resolveWithArgs('/tags'),
    },
    tag: itemResolver(Tag, tags),
    pages: {
      type: new GraphQLList(Page),
      resolve: resolveWithArgs('/pages'),
    },
    page: itemResolver(Page, pages),
    comments: {
      type: new GraphQLList(Comment),
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
      resolve: () => (
        request('/taxonomies').then(taxMap => (
          Object.keys(taxMap).map(type => ({
            ...taxMap[type],
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
