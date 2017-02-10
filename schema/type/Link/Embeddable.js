import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

const Embeddable = new GraphQLObjectType({
  name: 'Embeddable',
  description: 'An embeddable link for an entity.',
  fields: {
    href: { type: GraphQLString },
    embeddable: { type: GraphQLBoolean },
  },
});

export default Embeddable;
