import { GraphQLUnionType } from 'graphql';

import ElementType from 'type/ContentNode/Element';
import TextType from 'type/ContentNode/Text';

const ContentNodeType = new GraphQLUnionType({
  name: 'ContentNode',
  types: [ElementType, TextType],
});

export default ContentNodeType;
