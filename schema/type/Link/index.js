import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const Link = new GraphQLObjectType({
  name: 'Link',
  description: 'A link for a post.',
  fields: {
    href: { type: GraphQLString },
  },
});

export default Link;
