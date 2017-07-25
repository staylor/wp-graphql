import { GraphQLObjectType, GraphQLList } from 'graphql';

import rendered from 'field/rendered';
import ContentNode from 'type/ContentNode';

const Title = new GraphQLObjectType({
  name: 'Title',
  description: 'The title for an object.',
  fields: {
    ...rendered,
    data: {
      type: new GraphQLList(ContentNode),
    },
  },
});

export default Title;
