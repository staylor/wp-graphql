import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import Link from 'type/Link';
import PostTypeLink from 'type/Link/PostTypeLink';
import EmbeddableLink from 'type/Link/EmbeddableLink';

const CommentLinks = new GraphQLObjectType({
  name: 'CommentLinks',
  description: 'The links for a comment.',
  fields: {
    self: { type: new GraphQLList(Link) },
    collection: { type: new GraphQLList(Link) },
    author: { type: new GraphQLList(EmbeddableLink) },
    up: { type: new GraphQLList(PostTypeLink) },
  },
});

export default CommentLinks;
