import { GraphQLEnumType } from 'graphql';

const PAGE_ORDERBY = new GraphQLEnumType({
  name: 'PAGE_ORDERBY',
  values: {
    DATE: { value: 'date' },
    RELEVANCE: { value: 'relevance' },
    ID: { value: 'id' },
    INCLUDE: { value: 'include' },
    TITLE: { value: 'title' },
    SLUG: { value: 'slug' },
    MENU_ORDER: { value: 'menu_order' },
  },
});

export default PAGE_ORDERBY;
