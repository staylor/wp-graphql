import NavMenu from 'data/NavMenu';

describe('Test NavMenu data access', () => {
  test('Get endpoint', () => {
    expect(NavMenu.getEndpoint()).toMatchSnapshot();
  });

  test('Load a NavMenu', async () => {
    const menu = await NavMenu.load('main-nav');
    expect(menu.getID()).toMatchSnapshot();
    expect(menu).toMatchSnapshot();
  });
});
