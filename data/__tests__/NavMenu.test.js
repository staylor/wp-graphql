import { toGlobalId } from 'graphql-relay';
import NavMenu from 'data/NavMenu';

// https://highforthis.com/wp-json/graphql/v1/nav-menus/2

describe('Test the fetching of NavMenu data', () => {
  test('Collection should return a list of NavMenu objects', async () => {
    const { items: navMenus } = await NavMenu.collection();
    navMenus.forEach(navMenu => expect(navMenu).toBeInstanceOf(NavMenu));
    expect(navMenus.length).toBeGreaterThan(0);
  });

  test('Dataloader should return a NavMenu', async () => {
    const result = await NavMenu.load(toGlobalId('NavMenu', 2));
    expect(result).toBeInstanceOf(NavMenu);
  });
});
