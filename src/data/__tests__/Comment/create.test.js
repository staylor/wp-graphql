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

describe('Test Comment mutation: create', () => {
  test('Test create', async () => {
    const input = {
      content: 'Cool comment!',
      author_email: 'scott.c.taylor@mac.com',
      author_name: 'Scott Taylor',
      post: 'UG9zdDoyNzEw',
    };
    const create = await Comment.create(input);
    expect(create).toMatchSnapshot();
  });

  test('Test create error: no input', async () => {
    const input = {};
    try {
      await Comment.create(input);
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });

  test('Test create error: no post', async () => {
    const input = {
      author_email: 'scott.c.taylor@mac.com',
      author_name: 'Scott Taylor',
    };
    try {
      await Comment.create(input);
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
