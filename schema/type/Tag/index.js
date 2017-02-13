import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import TermInterface from 'interface/Term';
import TagLinks from 'type/Tag/Links';

import { id, slug, name, link } from 'field/identifier';
import description from 'field/description';
import metaField from 'field/meta';

const Tag = new GraphQLObjectType({
  name: 'Tag',
  description: 'A unique identifier for a post.',
  interfaces: [TermInterface],
  isTypeOf(term) {
    return term.taxonomy === 'post_tag';
  },
  fields: {
    id,
    count: { type: GraphQLInt },
    description,
    link,
    name,
    slug,
    taxonomy: { type: GraphQLString },
    meta: metaField(),
    _links: { type: TagLinks },
  },
});

export default Tag;
