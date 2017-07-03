import Comment from 'data/Comment';

jest.mock('../../utils', () =>
  jest.fn(() => ({
    data: {
      body: {
        id: 13,
        deleted: 1,
      },
    },
  }))
);

describe('Test Comment CRUD: delete', () => {
  test('Test delete', async () => {
    const input = {
      id: 13,
    };
    const deletion = await Comment.delete(input);
    expect(deletion).toMatchSnapshot();
  });
});
