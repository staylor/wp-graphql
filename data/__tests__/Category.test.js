import { toGlobalId } from 'graphql-relay';
import Category from 'data/Category';

// http://highforthis.com/wp-json/wp/v2/categories/4

describe('Test the fetching of Category data', () => {
  test('Collection should return a list of Category objects', async () => {
    const { items: categories } = await Category.collection();
    categories.forEach(cat => expect(cat).toBeInstanceOf(Category));
    expect(categories.length).toBeGreaterThan(0);
  });

  test('Dataloader should return a Category', async () => {
    const result = await Category.load(toGlobalId('Category', 4));
    expect(result).toBeInstanceOf(Category);
    expect(result.count).toBeGreaterThan(0);
    expect(result.description).toBeDefined();
    expect(result.name).toBe('Watch This');
    expect(result.slug).toBe('watch-this');
    expect(result.taxonomy).toBe('category');
    expect(result.parent).toBe(0);
    expect(result.meta).toHaveLength(0);
  });
});
