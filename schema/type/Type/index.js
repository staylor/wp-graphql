import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import TypeLinks from 'type/Type/Links';

import { slug, name } from 'field/identifier';
import description from 'field/description';

const Type = new GraphQLObjectType({
  name: 'Type',
  description: 'A post type.',
  fields: {
    type: { type: GraphQLString },
    description,
    hierarchical: { type: GraphQLBoolean },
    name,
    slug,
    taxonomies: { type: new GraphQLList(GraphQLString) },
    rest_base: { type: GraphQLString },
    _links: { type: TypeLinks },
  },
});

export default Type;
