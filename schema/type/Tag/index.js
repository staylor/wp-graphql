import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import TermInterface from 'interface/Term';
import TagLinks from 'type/Tag/Links';

import { globalIdField, slug, name, link } from 'field/identifier';
import description from 'field/description';
import metaField from 'field/meta';

const TagType = new GraphQLObjectType({
  name: 'Tag',
  description: 'A unique identifier for a post.',
  interfaces: [TermInterface],
  isTypeOf(term) {
    return term.taxonomy === 'post_tag';
  },
  fields: {
    id: globalIdField(),
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

export default TagType;
