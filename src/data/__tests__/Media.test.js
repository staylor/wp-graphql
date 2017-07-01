import Media from 'data/Media';

describe('Test Media data access', () => {
  test('Get endpoint', () => {
    expect(Media.getEndpoint()).toMatchSnapshot();
  });

  test('Load a media item', async () => {
    const media = await Media.load(13);
    expect(media.getID()).toMatchSnapshot();
    expect(media).toMatchSnapshot();
  });
});
