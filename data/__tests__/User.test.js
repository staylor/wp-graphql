import { toGlobalId } from 'graphql-relay';
import User from 'data/User';

// https://highforthis.com/wp-json/wp/v2/users/1

it('Dataloader should return a User', async () => {
  const result = await User.load(toGlobalId('User', 1));
  expect(result instanceof User).toBe(true);
});
