import { toGlobalId } from 'graphql-relay';
import Type from 'data/Type';

// https://highforthis.com/wp-json/wp/v2/types/post

describe('Test the fetching of Type data', () => {
  test('Collection should return a list of Type objects', async () => {
    const types = await Type.collection();
    types.forEach(type => expect(type).toBeInstanceOf(Type));
    expect(types.length).toBeGreaterThan(0);
  });

  test('Dataloader should return a Type', async () => {
    const result = await Type.load(toGlobalId('Type', 'post'));
    expect(result).toBeInstanceOf(Type);
    expect(result.description).toBe('');
    expect(result.hierarchical).toBe(false);
    expect(result.name).toBe('Posts');
    expect(result.slug).toBe('post');

    const expected = ['category', 'post_tag'];
    expect(result.taxonomies).toEqual(expect.arrayContaining(expected));
    expect(result.rest_base).toBe('posts');
  });
});
