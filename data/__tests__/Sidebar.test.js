import { toGlobalId } from 'graphql-relay';
import Sidebar from 'data/Sidebar';

// https://highforthis.com/wp-json/graphql/v1/sidebars/sidebar-1

describe('Test the fetching of Sidebar data', () => {
  test('Collection should return a list of Sidebar objects', async () => {
    const { items: sidebars } = await Sidebar.collection();
    sidebars.forEach(sidebar => expect(sidebar).toBeInstanceOf(Sidebar));
    expect(sidebars.length).toBeGreaterThan(0);
  });

  test('Dataloader should return a Sidebar', async () => {
    const result = await Sidebar.load(toGlobalId('Sidebar', 'sidebar-1'));
    expect(result).toBeInstanceOf(Sidebar);
  });
});
