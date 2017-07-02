import Media from 'data/Media';

describe('Test Media data access', () => {
  test('Get endpoint', () => {
    expect(Media.getEndpoint()).toMatchSnapshot();
  });
});
