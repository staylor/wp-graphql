import Tag from 'data/Tag';

describe('Test Tag data access', () => {
  test('Get endpoint', () => {
    expect(Tag.getEndpoint()).toMatchSnapshot();
  });

  test('Load a tag', async () => {
    const tag = await Tag.load(13);
    expect(tag.getID()).toMatchSnapshot();
    expect(tag).toMatchSnapshot();
  });

  test('Load a tag by slug', async () => {
    const tag = await Tag.loadBySlug('dirty-projectors');
    expect(tag).toMatchSnapshot();
  });

  test('Load tags', async () => {
    const tag = await Tag.loadMany([13, 17]);
    expect(tag).toMatchSnapshot();
  });
});
