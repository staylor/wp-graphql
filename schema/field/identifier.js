import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import Guid from 'type/Guid';

export const globalIdField = () => ({
  type: new GraphQLNonNull(GraphQLID),
  description: 'Unique identifier for the object.',
  resolve: data => data.getID(),
});

export const name = {
  type: GraphQLString,
  description: 'HTML title for the object.',
};

export const slug = {
  type: GraphQLString,
  description: 'An alphanumeric identifier for the object unique to its type.',
};

export const guid = { type: Guid };

export const link = {
  type: GraphQLString,
  description: 'URL to the object.',
};
