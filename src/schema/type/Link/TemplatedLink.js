import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';

const TemplatedLink = new GraphQLObjectType({
  name: 'TemplatedLink',
  fields: {
    name: { type: GraphQLString },
    href: { type: GraphQLString },
    templated: { type: GraphQLBoolean },
  },
});

export default TemplatedLink;
