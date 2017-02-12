import { GraphQLEnumType } from 'graphql';

const USER_ORDERBY = new GraphQLEnumType({
  name: 'USER_ORDERBY',
  values: {
    ID: { value: 'id' },
    INCLUDE: { value: 'include' },
    NAME: { value: 'name' },
    REGISTERED_DATE: { value: 'registered_date' },
    SLUG: { value: 'slug' },
    EMAIL: { value: 'email' },
    URL: { value: 'url' },
  },
});

export default USER_ORDERBY;
