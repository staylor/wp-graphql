import { toGlobalId } from 'graphql-relay';
import Comment from 'data/Comment';

// https://highforthis.com/wp-json/wp/v2/comments/17

it('Dataloader should return a Comment', async () => {
  const result = await Comment.load(toGlobalId('Comment', 17));
  expect(result instanceof Comment).toBe(true);
  expect(result.id).toBe(17);
  expect(result.post).toBe(2696);
  expect(result.parent).toBe(16);
  expect(result.author).toBe(1);
  expect(result.author_name).toBe('Scott Taylor');
  expect(result.author_url).toBeDefined();
  expect(result.date).toBe('2017-02-21T17:40:19');
  expect(result.date_gmt).toBe('2017-02-21T22:40:19');
  expect(result.content.rendered).toBeDefined();
  expect(result.status).toBe('approved');
  expect(result.type).toBe('comment');
  expect(result.author_avatar_urls).toBeDefined();
  expect(result.meta.length).toBe(0);
});
