import { toGlobalId } from 'graphql-relay';
import Type from 'data/Type';

// https://highforthis.com/wp-json/wp/v2/types/post

it('Dataloader should return a Type', async () => {
  const result = await Type.load(toGlobalId('Type', 'post'));
  expect(result instanceof Type).toBe(true);
  expect(result.description).toBe('');
  expect(result.hierarchical).toBe(false);
  expect(result.name).toBe('Posts');
  expect(result.slug).toBe('post');

  const expected = ['category', 'post_tag'];
  expect(result.taxonomies).toEqual(expect.arrayContaining(expected));
  expect(result.rest_base).toBe('posts');
});
