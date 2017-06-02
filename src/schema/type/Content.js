import { GraphQLObjectType } from 'graphql';

import rendered from 'field/rendered';
import raw from 'field/raw';
// 'protected' is a reserved word in JS
import protectedField from 'field/protected';

const Content = new GraphQLObjectType({
  name: 'Content',
  description: 'The content for the object.',
  fields: {
    ...rendered,
    ...raw,
    ...protectedField,
  },
});

export default Content;
