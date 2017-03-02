import { toGlobalId } from 'graphql-relay';
import Category from 'data/Category';

// http://highforthis.com/wp-json/wp/v2/categories/4

it('Dataloader should return a Category', async () => {
  const result = await Category.load(toGlobalId('Category', 4));
  expect(result instanceof Category).toBe(true);
  expect(result.count).toBeGreaterThan(0);
  expect(result.description).toBeDefined();
  expect(result.name).toBe('Watch This');
  expect(result.slug).toBe('watch-this');
  expect(result.taxonomy).toBe('category');
  expect(result.parent).toBe(0);
  expect(result.meta.length).toBe(0);
});
