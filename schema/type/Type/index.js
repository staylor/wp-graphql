import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import TypeLinks from 'type/Type/Links';

const Type = new GraphQLObjectType({
  name: 'Type',
  description: 'A post type.',
  fields: {
    type: { type: GraphQLString },
    description: { type: GraphQLString },
    hierarchical: { type: GraphQLBoolean },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    taxonomies: { type: new GraphQLList(GraphQLString) },
    rest_base: { type: GraphQLString },
    _links: { type: TypeLinks },
  },
});

export default Type;
