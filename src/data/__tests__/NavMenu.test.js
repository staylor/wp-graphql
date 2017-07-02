import NavMenu from 'data/NavMenu';

describe('Test NavMenu data access', () => {
  test('Get endpoint', () => {
    expect(NavMenu.getEndpoint()).toMatchSnapshot();
  });
});
