import User from 'data/User';

describe('Test User data access', () => {
  test('Get endpoint', () => {
    expect(User.getEndpoint()).toMatchSnapshot();
  });

  test('Load a user', async () => {
    const user = await User.load(1);
    expect(user.getID()).toMatchSnapshot();
    expect(user).toMatchSnapshot();
  });

  test('Load a user by slug', async () => {
    const user = await User.loadBySlug('admin');
    expect(user).toMatchSnapshot();
  });
});
