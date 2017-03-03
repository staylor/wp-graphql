import { toGlobalId } from 'graphql-relay';
import Taxonomy from 'data/Taxonomy';

// https://highforthis.com/wp-json/wp/v2/taxonomies/category

describe('Test the fetching of Taxonomy data', () => {
  test('Collection should return a list of Taxonomy objects', async () => {
    const { items: taxonomies } = await Taxonomy.collection();
    taxonomies.forEach(taxonomy => expect(taxonomy).toBeInstanceOf(Taxonomy));
    expect(taxonomies.length).toBeGreaterThan(0);
  });

  test('Dataloader should return a Taxonomy', async () => {
    const result = await Taxonomy.load(toGlobalId('Taxonomy', 'category'));
    expect(result).toBeInstanceOf(Taxonomy);
    expect(result.description).toBe('');
    expect(result.hierarchical).toBe(true);
    expect(result.name).toBe('Categories');
    expect(result.slug).toBe('category');

    const expected = ['post'];
    expect(result.types).toEqual(expect.arrayContaining(expected));
    expect(result.rest_base).toBe('categories');
  });
});
