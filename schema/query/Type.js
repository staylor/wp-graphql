import {
  GraphQLList,
  GraphQLString,
} from 'graphql';

import Type from 'type/Type';

import request, { types } from 'data';

export default {
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
};
