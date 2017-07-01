import Sidebar from 'data/Sidebar';

describe('Test Sidebar data access', () => {
  test('Get endpoint', () => {
    expect(Sidebar.getEndpoint()).toMatchSnapshot();
  });

  test('Load a Sidebar', async () => {
    const sidebar = await Sidebar.load('main-nav');
    expect(sidebar.getID()).toMatchSnapshot();
    expect(sidebar).toMatchSnapshot();
  });
});
