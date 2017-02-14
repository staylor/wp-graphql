import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import TypeType from 'type/Type';
import Type from 'data/Type';
import request from 'data';

export default {
  types: {
    type: new GraphQLList(TypeType),
    resolve: () => (
      request('/types').then(typeMap => (
        Object.keys(typeMap).map(type => (Object.assign(new Type(), {
          ...typeMap[type],
          id: type,
        })))
      ))
    ),
  },
  type: {
    type: TypeType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'Unique identifier for the object.',
      },
    },
    // eslint-disable-next-line no-confusing-arrow
    resolve: (root, { id }) => (
      Type.load(id).then(typeData => (Object.assign(new Type(), {
        ...typeData,
        id,
      })))
    ),
  },
};
