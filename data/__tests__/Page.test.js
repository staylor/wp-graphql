import { toGlobalId } from 'graphql-relay';
import Page from 'data/Page';

// https://highforthis.com/wp-json/wp/v2/pages/215

it('Dataloader should return a Page by ID', async () => {
  const result = await Page.load(toGlobalId('Page', 215));
  expect(result instanceof Page).toBe(true);
});

it('Dataloader should return a Page by slug', async () => {
  const result = await Page.loadBySlug('go-to-this');
  expect(result instanceof Page).toBe(true);
});
