import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

const TermLink = new GraphQLObjectType({
  name: 'TermLink',
  fields: {
    taxonomy: { type: GraphQLString },
    href: { type: GraphQLString },
    embeddable: { type: GraphQLBoolean },
  },
});

export default TermLink;
