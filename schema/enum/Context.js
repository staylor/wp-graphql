import { GraphQLEnumType } from 'graphql';

const CONTEXT = new GraphQLEnumType({
  name: 'CONTEXT',
  values: {
    VIEW: { value: 'view' },
    EDIT: { value: 'edit' },
    EMBED: { value: 'embed' },
  },
});

export default CONTEXT;
