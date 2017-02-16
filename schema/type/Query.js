import { GraphQLObjectType } from 'graphql';

import queries from 'query';

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'WordPress REST API read-only data',
  fields: queries,
});

export default Query;
