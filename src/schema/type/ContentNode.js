import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import Meta from 'type/Meta';

const ContentNode = new GraphQLObjectType({
  name: 'ContentNode',
  description: 'A content node.',
  fields: () => ({
    text: {
      type: GraphQLString,
    },
    tagName: {
      type: GraphQLString,
    },
    attributes: {
      type: new GraphQLList(Meta),
    },
    children: {
      type: new GraphQLList(ContentNode),
    },
  }),
});

export default ContentNode;
