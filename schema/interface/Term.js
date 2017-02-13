import {
  GraphQLInterfaceType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Meta from 'type/Meta';
import { id, slug, name, link } from 'field/identifier';
import description from 'field/description';

const TermInterface = new GraphQLInterfaceType({
  name: 'TermInterface',
  description: 'Term fields.',
  fields: {
    id,
    count: { type: GraphQLInt },
    description,
    link,
    name,
    slug,
    taxonomy: { type: GraphQLString },
    meta: { type: new GraphQLList(Meta) },
  },
});

export default TermInterface;
