import CommentType from 'type/Comment';

// eslint-disable-next-line no-underscore-dangle
const fields = CommentType._typeConfig.fields();

describe('Test Comment type', () => {
  test('Test name', () => {
    expect(CommentType.name).toMatchSnapshot();
  });

  test('Test fields', () => {
    expect(Object.keys(CommentType.getFields())).toMatchSnapshot();
  });

  test('Test resolve post', () => {
    const post = fields.post.resolve({ post: 13 });
    expect(post).toMatchSnapshot();
  });

  test('Test resolve parent', () => {
    const parent = fields.parent.resolve({ parent: 69 });
    expect(parent).toMatchSnapshot();
  });

  test('Test resolve parent null', () => {
    expect(fields.parent.resolve({ parent: 0 })).toBeNull();
  });

  test('Test resolve avatars', () => {
    const avatars = fields.author_avatar_urls.resolve({
      author_avatar_urls: {
        thumbnail: 'https://scott.com/avi.jpg',
      },
    });
    expect(avatars).toMatchSnapshot();
  });
});
