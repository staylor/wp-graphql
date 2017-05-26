import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';

const EmbeddableLink = new GraphQLObjectType({
  name: 'EmbeddableLink',
  description: 'An embeddable link for an entity.',
  fields: {
    href: { type: GraphQLString },
    embeddable: { type: GraphQLBoolean },
  },
});

export default EmbeddableLink;
