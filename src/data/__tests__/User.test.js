import User from 'data/User';

describe('Test User data access', () => {
  test('Get endpoint', () => {
    expect(User.getEndpoint()).toMatchSnapshot();
  });
});
