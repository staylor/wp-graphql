import {
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import ORDER from 'enum/Order';
import TAXONOMY_ORDERBY from 'enum/TaxonomyOrderby';

export const pagination = {
  page: { type: GraphQLInt },
  per_page: { type: GraphQLInt },
  offset: { type: GraphQLInt },
  order: { type: ORDER },
};

export const filter = {
  search: { type: GraphQLString },
  // value or comma-separated values
  include: { type: GraphQLString },
  exclude: { type: GraphQLString },
};

export const date = {
  // must be in format: 2017-02-11T00:00:00
  after: { type: GraphQLString },
  before: { type: GraphQLString },
};

export const hierarchical = {
  // value or comma-separated values
  parent: { type: GraphQLString },
  parent_exclude: { type: GraphQLString },
};

export const author = {
  // value or comma-separated values
  author: { type: GraphQLString },
  author_exclude: { type: GraphQLString },
};

export const slug = {
  // value or comma-separated values
  slug: { type: GraphQLString },
};

export const taxonomy = {
  orderby: { type: TAXONOMY_ORDERBY },
  hide_empty: { type: GraphQLBoolean },
  post: { type: GraphQLInt },
};
