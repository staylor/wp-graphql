import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';

const PostTypeLink = new GraphQLObjectType({
  name: 'PostTypeLink',
  description: 'An embeddable link for an entity.',
  fields: {
    href: { type: GraphQLString },
    embeddable: { type: GraphQLBoolean },
    post_type: { type: GraphQLString },
  },
});

export default PostTypeLink;
