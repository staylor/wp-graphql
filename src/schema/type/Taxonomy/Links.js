import { GraphQLObjectType, GraphQLList } from 'graphql';

import Link from 'type/Link';
import TemplatedLink from 'type/Link/TemplatedLink';

const TaxonomyLinks = new GraphQLObjectType({
  name: 'TaxonomyLinks',
  description: 'The links for a taxonomy.',
  fields: {
    collection: { type: new GraphQLList(Link) },
    items: {
      type: new GraphQLList(Link),
      // eslint-disable-next-line no-underscore-dangle
      resolve: type => type._links['wp:items'],
    },
    curies: { type: new GraphQLList(TemplatedLink) },
  },
});

export default TaxonomyLinks;
