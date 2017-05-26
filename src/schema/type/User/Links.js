import { GraphQLObjectType, GraphQLList } from 'graphql';

import Link from 'type/Link';

const UserLinks = new GraphQLObjectType({
  name: 'UserLinks',
  description: 'The links for a user.',
  fields: {
    self: { type: new GraphQLList(Link) },
    collection: { type: new GraphQLList(Link) },
  },
});

export default UserLinks;
