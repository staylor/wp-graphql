import { toGlobalId } from 'graphql-relay';
import UserType from 'type/User';
import User from 'data/User';

export default {
  author: {
    type: UserType,
    description: 'The author object of the item.',
    resolve: data => (data.author > 0 ? User.load(toGlobalId('User', data.author)) : null),
  },
};
