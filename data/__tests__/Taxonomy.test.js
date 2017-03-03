import { toGlobalId } from 'graphql-relay';
import Taxonomy from 'data/Taxonomy';

// https://highforthis.com/wp-json/wp/v2/taxonomies/category

it('Dataloader should return a Taxonomy', async () => {
  const result = await Taxonomy.load(toGlobalId('Taxonomy', 'category'));
  expect(result instanceof Taxonomy).toBe(true);
  expect(result.description).toBe('');
  expect(result.hierarchical).toBe(true);
  expect(result.name).toBe('Categories');
  expect(result.slug).toBe('category');

  const expected = ['post'];
  expect(result.types).toEqual(expect.arrayContaining(expected));
  expect(result.rest_base).toBe('categories');
});
