import { GraphQLObjectType } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
} from 'graphql-relay';

import TypeType from 'type/Type';
import { loadEdges } from 'utils';
import Type from 'data/Type';

const { connectionType: TypeConnection } =
  connectionDefinitions({ nodeType: TypeType });

const TypeCollectionType = new GraphQLObjectType({
  name: 'TypeCollection',
  description: 'Collection of taxonomies based on cursors.',
  fields: {
    results: {
      type: TypeConnection,
      args: connectionArgs,
      description: 'A list of results',
      resolve: loadEdges(Type),
    },
  },
});

export default TypeCollectionType;
