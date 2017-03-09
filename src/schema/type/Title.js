import { GraphQLObjectType } from 'graphql';

import rendered from 'field/rendered';

const Title = new GraphQLObjectType({
  name: 'Title',
  description: 'The title for an object.',
  fields: {
    ...rendered,
  },
});

export default Title;
