import { toGlobalId } from 'graphql-relay';
import Page from 'data/Page';

// https://highforthis.com/wp-json/wp/v2/pages/215

describe('Test the fetching of Page data', () => {
  test('Collection should return a list of Page objects', async () => {
    const { items: pages } = await Page.collection();
    pages.forEach(page => expect(page).toBeInstanceOf(Page));
    expect(pages.length).toBeGreaterThan(0);
  });

  test('Dataloader should return a Page by ID', async () => {
    const result = await Page.load(toGlobalId('Page', 215));
    expect(result).toBeInstanceOf(Page);
  });

  test('Dataloader should return a Page by slug', async () => {
    const result = await Page.loadBySlug('go-to-this');
    expect(result).toBeInstanceOf(Page);
  });
});
