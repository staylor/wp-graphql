import { GraphQLEnumType } from 'graphql';

const ORDER = new GraphQLEnumType({
  name: 'ORDER',
  values: {
    ASC: { value: 'asc' },
    DESC: { value: 'desc' },
  },
});

export default ORDER;
