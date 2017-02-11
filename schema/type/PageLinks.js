import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import Link from './Link';
import EmbeddableLink from './Link/EmbeddableLink';
import TemplatedLink from './Link/TemplatedLink';
import TermLink from './Link/TermLink';

const PageLinks = new GraphQLObjectType({
  name: 'PageLinks',
  description: 'The links for a page.',
  fields: {
    self: { type: new GraphQLList(Link) },
    collection: { type: new GraphQLList(Link) },
    about: { type: new GraphQLList(Link) },
    author: { type: new GraphQLList(EmbeddableLink) },
    replies: { type: new GraphQLList(EmbeddableLink) },
    history: {
      type: new GraphQLList(Link),
      // eslint-disable-next-line no-underscore-dangle
      resolve: post => post._links['version-history'],
    },
    up: { type: new GraphQLList(EmbeddableLink) },
    attachment: {
      type: new GraphQLList(Link),
      // eslint-disable-next-line no-underscore-dangle
      resolve: post => post._links['wp:attachment'],
    },
    term: {
      type: new GraphQLList(TermLink),
      // eslint-disable-next-line no-underscore-dangle
      resolve: post => post._links['wp:term'],
    },
    curies: { type: new GraphQLList(TemplatedLink) },
  },
});

export default PageLinks;
