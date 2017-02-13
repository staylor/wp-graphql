import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import Avatar from 'type/User/Avatar';
import UserLinks from 'type/User/Links';

import { id, slug, name, link } from 'field/identifier';
import description from 'field/description';

const User = new GraphQLObjectType({
  name: 'User',
  description: 'An object.',
  fields: {
    id,
    name,
    description,
    link,
    slug,
    avatar_urls: {
      type: new GraphQLList(Avatar),
      description: 'Avatar URLs for the user.',
      resolve: user => (
        Object.keys(user.avatar_urls).map(key => ({
          size: key,
          url: user.avatar_urls[key],
        }))
      ),
    },
    _links: { type: UserLinks },
  },
});

export default User;
