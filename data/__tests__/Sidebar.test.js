import { toGlobalId } from 'graphql-relay';
import Sidebar from 'data/Sidebar';

// https://highforthis.com/wp-json/graphql/v1/sidebars/sidebar-1

it('Dataloader should return a Sidebar', async () => {
  const result = await Sidebar.load(toGlobalId('Sidebar', 'sidebar-1'));
  expect(result instanceof Sidebar).toBe(true);
});
