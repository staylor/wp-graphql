import { GraphQLObjectType, GraphQLList } from 'graphql';

import Avatar from 'type/User/Avatar';

import { globalIdField, slug, name, link } from 'field/identifier';
import description from 'field/description';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'An object.',
  fields: {
    id: globalIdField(),
    ...name,
    ...description,
    ...link,
    ...slug,
    avatar_urls: {
      type: new GraphQLList(Avatar),
      description: 'Avatar URLs for the user.',
      resolve: user =>
        Object.keys(user.avatar_urls).map(key => ({
          size: key,
          url: user.avatar_urls[key],
        })),
    },
  },
});

export default UserType;
