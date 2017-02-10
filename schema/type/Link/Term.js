import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

const Term = new GraphQLObjectType({
  name: 'Term',
  fields: {
    taxonomy: { type: GraphQLString },
    href: { type: GraphQLString },
    embeddable: { type: GraphQLBoolean },
  },
});

export default Term;
