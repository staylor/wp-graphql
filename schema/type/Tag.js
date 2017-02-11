import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Meta from './Meta';

import { metaResolver } from '../utils';

const Tag = new GraphQLObjectType({
  name: 'Tag',
  description: 'A unique identifier for a post.',
  fields: () => ({
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
  }),
});

export default Tag;
