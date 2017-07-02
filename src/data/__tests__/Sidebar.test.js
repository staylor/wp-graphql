import Sidebar from 'data/Sidebar';

describe('Test Sidebar data access', () => {
  test('Get endpoint', () => {
    expect(Sidebar.getEndpoint()).toMatchSnapshot();
  });
});
