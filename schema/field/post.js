import {
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import FORMAT from 'enum/Format';

export const type = {
  type: GraphQLString,
  description: 'Type of Post for the object.',
};

export const template = {
  type: GraphQLString,
  description: 'The theme file to use to display the object.',
};

export const format = { type: FORMAT };

export const sticky = {
  type: GraphQLBoolean,
  description: 'Whether or not the object should be treated as sticky.',
};
