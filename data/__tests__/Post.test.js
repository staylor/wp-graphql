import { toGlobalId } from 'graphql-relay';
import Post from 'data/Post';

// https://highforthis.com/wp-json/wp/v2/posts/2696

it('Dataloader should return a Post by ID', async () => {
  const result = await Post.load(toGlobalId('Post', 2696));
  expect(result instanceof Post).toBe(true);
});
