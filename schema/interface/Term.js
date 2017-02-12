import {
  GraphQLInterfaceType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Meta from 'type/Meta';
import { id, slug, name } from 'field/identifier';

const TermInterface = new GraphQLInterfaceType({
  name: 'TermInterface',
  description: 'Term fields.',
  fields: {
    id,
    count: { type: GraphQLInt },
    description: { type: GraphQLString },
    link: { type: GraphQLString },
    name,
    slug,
    taxonomy: { type: GraphQLString },
    meta: { type: new GraphQLList(Meta) },
  },
});

export default TermInterface;
