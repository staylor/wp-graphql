import { GraphQLObjectType } from 'graphql';

import queries from 'query';

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'WordPress API queries',
  fields: queries,
});

export default Query;
