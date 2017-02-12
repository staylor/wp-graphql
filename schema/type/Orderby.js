import { GraphQLEnumType } from 'graphql';

const ORDERBY = new GraphQLEnumType({
  name: 'ORDERBY',
  values: {
    DATE: { value: 'date' },
    RELEVANCE: { value: 'relevance' },
    ID: { value: 'id' },
    INCLUDE: { value: 'include' },
    TITLE: { value: 'title' },
    SLUG: { value: 'slug' },
  },
});

export default ORDERBY;
