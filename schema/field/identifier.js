import {
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import Guid from 'type/Guid';

export const id = {
  type: GraphQLInt,
  description: 'Unique identifier for the object.',
};

export const name = {
  type: GraphQLString,
  description: 'HTML title for the object.',
};

export const slug = {
  type: GraphQLString,
  description: 'An alphanumeric identifier for the object unique to its type.',
};

export const guid = {
  type: Guid,
  description: 'The globally unique identifier for the object.',
};
