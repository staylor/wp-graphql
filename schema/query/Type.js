import TypeCollectionType from 'type/Type/Collection';
import TypeType from 'type/Type';
import Type from 'data/Type';
import { itemResolver } from 'utils';

export default {
  types: {
    type: TypeCollectionType,
    resolve: (root, args) => ({ args }),
  },
  type: itemResolver(TypeType, Type),
};
