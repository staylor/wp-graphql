import { toGlobalId } from 'graphql-relay';
import Post from 'data/Post';

// https://highforthis.com/wp-json/wp/v2/posts/2696

describe('Test the fetching of Post data', () => {
  test('Collection should return a list of Post objects', async () => {
    const { items: posts } = await Post.collection();
    posts.forEach(post => expect(post).toBeInstanceOf(Post));
    expect(posts.length).toBeGreaterThan(0);
  });

  test('Dataloader should return a Post by ID', async () => {
    const result = await Post.load(toGlobalId('Post', 2696));
    expect(result).toBeInstanceOf(Post);
  });
});
