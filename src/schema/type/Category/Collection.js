import { GraphQLObjectType } from 'graphql';
import { connectionArgs, connectionDefinitions } from 'graphql-relay';

import CategoryType from 'type/Category';
import { loadEdges } from 'utils';
import Category from 'data/Category';

const { connectionType: CategoryConnection } = connectionDefinitions({ nodeType: CategoryType });

const CategoryCollectionType = new GraphQLObjectType({
  name: 'CategoryCollection',
  description: 'Collection of categories based on cursors.',
  fields: {
    results: {
      type: CategoryConnection,
      args: connectionArgs,
      description: 'A list of results',
      resolve: loadEdges(Category),
    },
  },
});

export default CategoryCollectionType;
