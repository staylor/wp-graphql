import { toGlobalId } from 'graphql-relay';
import Tag from 'data/Tag';

// http://highforthis.com/wp-json/wp/v2/tags/282

describe('Test the fetching of Tag data', () => {
  test('Collection should return a list of Tag objects', async () => {
    const { items: tags } = await Tag.collection();
    tags.forEach(tag => expect(tag).toBeInstanceOf(Tag));
    expect(tags.length).toBeGreaterThan(0);
  });

  test('Dataloader should return a Tag', async () => {
    const result = await Tag.load(toGlobalId('Tag', 282));
    expect(result).toBeInstanceOf(Tag);
    expect(result.count).toBeGreaterThan(0);
    expect(result.description).toBeDefined();
    expect(result.name).toBe('285 Kent');
    expect(result.slug).toBe('285-kent');
    expect(result.taxonomy).toBe('post_tag');
    expect(result.parent).not.toBeDefined();
    expect(result.meta).toHaveLength(0);
  });
});
