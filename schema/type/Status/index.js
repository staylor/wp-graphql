import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import StatusLinks from 'type/Status/Links';

import { slug, name } from 'field/identifier';

const Status = new GraphQLObjectType({
  name: 'Status',
  description: 'A post status.',
  fields: {
    name,
    type: { type: GraphQLString },
    public: { type: GraphQLBoolean },
    queryable: { type: GraphQLBoolean },
    slug,
    _links: { type: StatusLinks },
  },
});

export default Status;
