import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import Link from 'type/Link';

const StatusLinks = new GraphQLObjectType({
  name: 'StatusLinks',
  description: 'The links for a status.',
  fields: {
    archives: { type: new GraphQLList(Link) },
  },
});

export default StatusLinks;
