import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import StatusLinks from 'type/Status/Links';

const Status = new GraphQLObjectType({
  name: 'Status',
  description: 'A post status.',
  fields: {
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    public: { type: GraphQLBoolean },
    queryable: { type: GraphQLBoolean },
    slug: { type: GraphQLString },
    _links: { type: StatusLinks },
  },
});

export default Status;
