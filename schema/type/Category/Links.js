import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import Link from 'type/Link';
import EmbeddableLink from 'type/Link/EmbeddableLink';
import TemplatedLink from 'type/Link/TemplatedLink';
import TermLink from 'type/Link/TermLink';

const CategoryLinks = new GraphQLObjectType({
  name: 'CategoryLinks',
  description: 'The links for a post.',
  fields: {
    self: { type: new GraphQLList(Link) },
    collection: { type: new GraphQLList(Link) },
    about: { type: new GraphQLList(Link) },
    up: { type: new GraphQLList(EmbeddableLink) },
    post_type: {
      type: new GraphQLList(TermLink),
      // eslint-disable-next-line no-underscore-dangle
      resolve: tag => tag._links['wp:post_type'],
    },
    curies: { type: new GraphQLList(TemplatedLink) },
  },
});

export default CategoryLinks;
