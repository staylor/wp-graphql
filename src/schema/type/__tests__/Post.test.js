import PostType from 'type/Post';

// eslint-disable-next-line no-underscore-dangle
const fields = PostType._typeConfig.fields();

describe('Test Post type', () => {
  test('Test name', () => {
    expect(PostType.name).toMatchSnapshot();
  });

  test('Test type', () => {
    expect(PostType.isTypeOf({ type: 'post' })).toBe(true);
  });

  test('Test fields', () => {
    expect(Object.keys(PostType.getFields())).toMatchSnapshot();
  });

  test('Test resolve categories', async () => {
    const categories = await fields.categories.resolve({ categories: [69] });
    expect(categories).toMatchSnapshot();
  });

  test('Test resolve categories null', () => {
    expect(fields.categories.resolve({ categories: [] })).toBeNull();
  });

  test('Test resolve tags', async () => {
    const tags = await fields.tags.resolve({ tags: [69] });
    expect(tags).toMatchSnapshot();
  });

  test('Test resolve tags null', () => {
    expect(fields.tags.resolve({ tags: [] })).toBeNull();
  });
});
