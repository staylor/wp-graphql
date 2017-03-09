import { GraphQLSchema } from 'graphql';
import Query from 'type/Query';

const Schema = new GraphQLSchema({
  query: Query,
});

export default Schema;
