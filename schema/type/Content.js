import { GraphQLObjectType } from 'graphql';
import rendered from 'field/rendered';
// 'protected' is a reserved word in JS
import protectedField from 'field/protected';

const Content = new GraphQLObjectType({
  name: 'Content',
  description: 'The content for the object.',
  fields: {
    rendered,
    protected: protectedField,
  },
});

export default Content;
