import { GraphQLList } from 'graphql';

import TypeType from 'type/Type';
import Type from 'data/Type';
import { itemResolver } from 'utils';

export default {
  types: {
    description: 'List of types.',
    type: new GraphQLList(TypeType),
    resolve: () => Type.collection(),
  },
  type: itemResolver(TypeType, Type),
};
