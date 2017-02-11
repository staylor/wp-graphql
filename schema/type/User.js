import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Avatar from './Avatar';
import UserLinks from './UserLinks';

const User = new GraphQLObjectType({
  name: 'User',
  description: 'An object.',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    link: { type: GraphQLString },
    slug: { type: GraphQLString },
    avatar_urls: {
      type: new GraphQLList(Avatar),
      resolve: (user) => {
        Object.keys(user.avatar_urls).map(key => ({
          size: key,
          url: user.avatar_urls[key],
        }));
      },
    },
    _links: { type: UserLinks },
  },
});

export default User;
