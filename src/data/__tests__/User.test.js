import { toGlobalId } from 'graphql-relay';
import User from 'data/User';

// https://highforthis.com/wp-json/wp/v2/users/1

describe('Test the fetching of User data', () => {
  test('Collection should return a list of User objects', async () => {
    const { items: users } = await User.collection();
    users.forEach(user => expect(user).toBeInstanceOf(User));
    expect(users.length).toBeGreaterThan(0);
  });

  test('Dataloader should return a User', async () => {
    const result = await User.load(toGlobalId('User', 1));
    expect(result).toBeInstanceOf(User);
  });
});
