import Comment from 'data/Comment';

jest.mock('../../utils', () =>
  jest.fn(() => ({
    data: {
      body: {
        id: 13,
        post: 1,
      },
      headers: {
        'set-cookie': 'foo=bar',
      },
    },
  }))
);

describe('Test Comment CRUD: update', () => {
  test('Test update', async () => {
    const input = {
      id: 13,
      content: 'Updated comment!',
    };
    const update = await Comment.update(input);
    expect(update).toMatchSnapshot();
  });
});
