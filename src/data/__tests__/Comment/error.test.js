import Comment from 'data/Comment';

jest.mock('../../utils', () =>
  jest.fn(() => {
    throw Error('Error testing comment CRUD.');
  })
);

describe('Test Comment CRUD Errors', () => {
  test('Test create error', async () => {
    const input = {
      content: 'Cool comment!',
      author_email: 'scott.c.taylor@mac.com',
      author_name: 'Scott Taylor',
      post: 'UG9zdDoyNzEw',
    };
    const create = await Comment.create(input);
    expect(create).toMatchSnapshot();
  });

  test('Test update error', async () => {
    const input = {
      id: 13,
      content: 'Updated comment!',
    };
    const update = await Comment.update(input);
    expect(update).toMatchSnapshot();
  });

  test('Test delete error', async () => {
    const input = {
      id: 13,
    };
    const deletion = await Comment.delete(input);
    expect(deletion).toMatchSnapshot();
  });
});
