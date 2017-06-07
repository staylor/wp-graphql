import Comment from 'data/Comment';
import { dateRegex } from 'jest/utils';

// https://highforthis.com/wp-json/wp/v2/comments/17

describe('Test the fetching of Comment data', () => {
  test('Collection should return a list of Comment objects', async () => {
    const { items: comments } = await Comment.collection();
    comments.forEach(comment => expect(comment).toBeInstanceOf(Comment));
    expect(comments.length).toBeGreaterThan(0);
  });

  test('Dataloader should return a Comment', async () => {
    const result = await Comment.load(17);
    expect(result).toBeInstanceOf(Comment);
    expect(result.id).toBe(17);
    expect(result.post).toBe(2696);
    expect(result.parent).toBe(16);
    expect(result.author).toBe(1);
    expect(result.author_name).toBe('Scott Taylor');
    expect(result.author_url).toBeDefined();
    expect(result.date).toMatch(dateRegex);
    expect(result.date_gmt).toMatch(dateRegex);
    expect(result.content.rendered).toBeDefined();
    expect(result.status).toBe('approved');
    expect(result.type).toBe('comment');
    expect(result.author_avatar_urls).toBeDefined();
    expect(result.meta).toHaveLength(0);
  });
});
