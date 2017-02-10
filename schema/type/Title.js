import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const Title = new GraphQLObjectType({
  name: 'Title',
  description: 'The title for a post.',
  fields: {
    rendered: { type: GraphQLString },
  },
});

export default Title;
