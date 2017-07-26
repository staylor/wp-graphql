import { GraphQLObjectType, GraphQLString } from 'graphql';

const TextType = new GraphQLObjectType({
  name: 'Text',
  description: 'A text node.',
  isTypeOf(node) {
    return typeof node.text !== 'undefined';
  },
  fields: () => ({
    text: {
      type: GraphQLString,
    },
  }),
});

export default TextType;
