import User from 'type/User';
import { users } from 'data';

export default {
  type: User,
  description: 'The author object of the item.',
  resolve: data => (
    data.author > 0 ? users.load(data.author) : null
  ),
};
