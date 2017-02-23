import { GraphQLObjectType } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
} from 'graphql-relay';

import TaxonomyType from 'type/Taxonomy';
import { loadEdges } from 'utils';
import Taxonomy from 'data/Taxonomy';

const { connectionType: TaxonomyConnection } =
  connectionDefinitions({ nodeType: TaxonomyType });

const TaxonomyCollectionType = new GraphQLObjectType({
  name: 'TaxonomyCollection',
  description: 'Collection of taxonomies based on cursors.',
  fields: {
    results: {
      type: TaxonomyConnection,
      args: connectionArgs,
      description: 'A list of results',
      resolve: loadEdges(Taxonomy),
    },
  },
});

export default TaxonomyCollectionType;
