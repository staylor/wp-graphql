import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import Link from 'type/Link';
import TemplatedLink from 'type/Link/TemplatedLink';

const TypeLinks = new GraphQLObjectType({
  name: 'TypeLinks',
  description: 'The links for a type.',
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

export default TypeLinks;
