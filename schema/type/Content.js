import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

const Content = new GraphQLObjectType({
  name: 'Content',
  description: 'The content for a post.',
  fields: {
    rendered: { type: GraphQLString },
    protected: { type: GraphQLBoolean },
  },
});

export default Content;
