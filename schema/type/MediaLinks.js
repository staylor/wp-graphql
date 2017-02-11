import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import Link from './Link';
import EmbeddableLink from './Link/EmbeddableLink';

const MediaLinks = new GraphQLObjectType({
  name: 'MediaLinks',
  description: 'The links for the media.',
  fields: {
    self: { type: new GraphQLList(Link) },
    collection: { type: new GraphQLList(Link) },
    about: { type: new GraphQLList(Link) },
    author: { type: new GraphQLList(EmbeddableLink) },
    replies: { type: new GraphQLList(EmbeddableLink) },
  },
});

export default MediaLinks;
