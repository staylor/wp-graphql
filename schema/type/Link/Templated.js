import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

const Templated = new GraphQLObjectType({
  name: 'Templated',
  fields: {
    name: { type: GraphQLString },
    href: { type: GraphQLString },
    templated: { type: GraphQLBoolean },
  },
});

export default Templated;
