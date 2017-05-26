import { GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLID } from 'graphql';

import ORDER from 'enum/Order';
import TAXONOMY_ORDERBY from 'enum/TaxonomyOrderby';

export const pagination = {
  page: {
    type: GraphQLInt,
    description: 'Current page of the collection.',
  },
  per_page: {
    type: GraphQLInt,
    description: 'Maximum number of items to be returned in result set.',
  },
  offset: {
    type: GraphQLInt,
    description: 'Offset the result set by a specific number of items.',
  },
  order: { type: ORDER },
};

export const filter = {
  search: {
    type: GraphQLString,
    description: 'Limit results to those matching a string.',
  },
  include: {
    type: GraphQLString,
    description: 'Limit result set to specific IDs (value or comma-separated values).',
  },
  exclude: {
    type: GraphQLString,
    description: 'Ensure result set excludes specific IDs (value or comma-separated values).',
  },
};

export const date = {
  // must be in format: 2017-02-11T00:00:00
  after: {
    type: GraphQLString,
    description: 'Limit response to items published after a given ISO8601 compliant date.',
  },
  before: {
    type: GraphQLString,
    description: 'Limit response to items published before a given ISO8601 compliant date.',
  },
};

export const hierarchical = {
  // value or comma-separated values
  parent: {
    type: GraphQLString,
    description: 'Limit result set to items of specific parent IDs (value or comma-separated values).',
  },
  parent_exclude: {
    type: GraphQLString,
    description: 'Ensure result set excludes specific parent IDs (value or comma-separated values).',
  },
};

export const author = {
  author: {
    type: GraphQLString,
    description: 'Limit result set to items assigned to specific authors (value or comma-separated values).',
  },
  author_exclude: {
    type: GraphQLString,
    description: 'Ensure result set excludes items assigned to specific authors (value or comma-separated values).',
  },
};

export const slug = {
  slug: {
    type: GraphQLString,
    description: 'Limit result set to items with one or more specific slugs (value or comma-separated values).',
  },
};

export const taxonomy = {
  orderby: { type: TAXONOMY_ORDERBY },
  hide_empty: {
    type: GraphQLBoolean,
    description: 'Whether to hide terms not assigned to any posts.',
  },
  post: {
    type: GraphQLID,
    description: 'Limit result set to terms assigned to a specific post.',
  },
};
