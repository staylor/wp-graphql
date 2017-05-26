import { GraphQLObjectType } from 'graphql';
import { connectionArgs, connectionDefinitions } from 'graphql-relay';

import PageType from 'type/Page';
import { loadEdges } from 'utils';
import Page from 'data/Page';

const { connectionType: PageConnection } = connectionDefinitions({ nodeType: PageType });

const PageCollectionType = new GraphQLObjectType({
  name: 'PageCollection',
  description: 'Collection of pages based on cursors.',
  fields: {
    results: {
      type: PageConnection,
      args: connectionArgs,
      description: 'A list of results',
      resolve: loadEdges(Page),
    },
  },
});

export default PageCollectionType;
