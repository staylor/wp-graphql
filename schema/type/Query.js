import { GraphQLObjectType } from 'graphql';

import queries from 'query';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: queries,
});

export default Query;
