import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import TermInterface from 'interface/Term';
import Meta from 'type/Meta';
import TagLinks from 'type/Tag/Links';
import { metaResolver } from 'utils';

const Tag = new GraphQLObjectType({
  name: 'Tag',
  description: 'A unique identifier for a post.',
  interfaces: [TermInterface],
  isTypeOf(term) {
    return term.taxonomy === 'post_tag';
  },
  fields: {
    id: { type: GraphQLInt },
    count: { type: GraphQLInt },
    description: { type: GraphQLString },
    link: { type: GraphQLString },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    taxonomy: { type: GraphQLString },
    meta: {
      type: new GraphQLList(Meta),
      resolve: metaResolver,
    },
    _links: { type: TagLinks },
  },
});

export default Tag;
