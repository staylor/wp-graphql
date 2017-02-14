import UserType from 'type/User';
import User from 'data/User';
import { toGlobalId } from 'utils';

export default {
  type: UserType,
  description: 'The author object of the item.',
  resolve: data => (
    data.author > 0 ? User.load(toGlobalId('User', data.author)) : null
  ),
};
