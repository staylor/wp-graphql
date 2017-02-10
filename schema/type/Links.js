import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import Link from './Link';
import Embeddable from './Link/Embeddable';
import Templated from './Link/Templated';
import Term from './Link/Term';

const Links = new GraphQLObjectType({
  name: 'Links',
  description: 'The links for a post.',
  fields: {
    self: { type: new GraphQLList(Link) },
    collection: { type: new GraphQLList(Link) },
    about: { type: new GraphQLList(Link) },
    author: { type: new GraphQLList(Embeddable) },
    replies: { type: new GraphQLList(Embeddable) },
    history: {
      type: new GraphQLList(Link),
      // eslint-disable-next-line no-underscore-dangle
      resolve: post => post._links['version-history'],
    },
    attachment: {
      type: new GraphQLList(Link),
      // eslint-disable-next-line no-underscore-dangle
      resolve: post => post._links['wp:attachment'],
    },
    term: {
      type: new GraphQLList(Term),
      // eslint-disable-next-line no-underscore-dangle
      resolve: post => post._links['wp:term'],
    },
    curies: { type: new GraphQLList(Templated) },
  },
});

export default Links;
