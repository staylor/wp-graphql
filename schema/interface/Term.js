import {
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Meta from 'type/Meta';
import { slug, name, link } from 'field/identifier';
import description from 'field/description';

const TermInterface = new GraphQLInterfaceType({
  name: 'TermInterface',
  description: 'Term fields.',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier for the object.',
    },
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
