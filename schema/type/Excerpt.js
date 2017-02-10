import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

const Excerpt = new GraphQLObjectType({
  name: 'Excerpt',
  description: 'The excerpt for a post.',
  fields: {
    rendered: { type: GraphQLString },
    protected: { type: GraphQLBoolean },
  },
});

export default Excerpt;
