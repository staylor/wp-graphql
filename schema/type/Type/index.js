import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import TypeLinks from 'type/Type/Links';

import { globalIdField, slug, name } from 'field/identifier';
import description from 'field/description';

const TypeType = new GraphQLObjectType({
  name: 'Type',
  description: 'A post type.',
  fields: {
    id: globalIdField(),
    description,
    hierarchical: { type: GraphQLBoolean },
    name,
    slug,
    taxonomies: { type: new GraphQLList(GraphQLString) },
    rest_base: { type: GraphQLString },
    _links: { type: TypeLinks },
  },
});

export default TypeType;
