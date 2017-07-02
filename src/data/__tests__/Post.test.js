import Post from 'data/Post';

jest.mock('../utils', () =>
  jest.fn(() => ({
    data: {
      body: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      headers: {
        'x-wp-total': 5,
      },
    },
  }))
);

describe('Test Post data access', () => {
  test('Get endpoint', () => {
    expect(Post.getEndpoint()).toMatchSnapshot();
  });

  test('Load Post collection', async () => {
    const collection = await Post.collection();
    expect(collection).toMatchSnapshot();
  });
});
