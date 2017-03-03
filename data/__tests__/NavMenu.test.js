import { toGlobalId } from 'graphql-relay';
import NavMenu from 'data/NavMenu';

// https://highforthis.com/wp-json/graphql/v1/nav-menus/2

it('Dataloader should return a NavMenu', async () => {
  const result = await NavMenu.load(toGlobalId('NavMenu', 2));
  expect(result instanceof NavMenu).toBe(true);
});
