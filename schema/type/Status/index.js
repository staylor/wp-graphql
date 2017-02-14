import {
  GraphQLObjectType,
  GraphQLBoolean,
} from 'graphql';

import StatusLinks from 'type/Status/Links';

import { globalIdField, slug, name } from 'field/identifier';

const StatusType = new GraphQLObjectType({
  name: 'Status',
  description: 'A post status.',
  fields: {
    id: globalIdField(),
    name,
    public: { type: GraphQLBoolean },
    queryable: { type: GraphQLBoolean },
    slug,
    _links: { type: StatusLinks },
  },
});

export default StatusType;
