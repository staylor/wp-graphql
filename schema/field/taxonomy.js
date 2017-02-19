import {
  GraphQLInt,
  GraphQLString,
} from 'graphql';

export default {
  taxonomy: {
    type: GraphQLString,
    description: 'Type attribution for the term.',
  },
  count: {
    type: GraphQLInt,
    description: 'Number of published posts for the term.',
  },
};
