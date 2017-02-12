import { GraphQLEnumType } from 'graphql';

const POST_ORDERBY = new GraphQLEnumType({
  name: 'POST_ORDERBY',
  values: {
    DATE: { value: 'date' },
    RELEVANCE: { value: 'relevance' },
    ID: { value: 'id' },
    INCLUDE: { value: 'include' },
    TITLE: { value: 'title' },
    SLUG: { value: 'slug' },
  },
});

export default POST_ORDERBY;
