import { GraphQLEnumType } from 'graphql';

const COMMENT_STATUS = new GraphQLEnumType({
  name: 'COMMENT_STATUS',
  values: {
    OPEN: { value: 'open' },
    CLOSED: { value: 'closed' },
  },
});

export default COMMENT_STATUS;
