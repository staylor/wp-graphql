import { GraphQLString } from 'graphql';

/* eslint-disable camelcase */

export const date = {
  type: GraphQLString,
  description: 'The date the object was published, in the timezone of the site.',
};

export const date_gmt = {
  type: GraphQLString,
  description: 'The date the object was published, as GMT.',
};

export const modified = {
  type: GraphQLString,
  description: 'The date the object was modified, in the timezone of the site.',
};

export const modified_gmt = {
  type: GraphQLString,
  description: 'The date the object was modified, as GMT.',
};
