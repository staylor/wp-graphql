import Tag from 'data/Tag';

describe('Test Tag data access', () => {
  test('Get endpoint', () => {
    expect(Tag.getEndpoint()).toMatchSnapshot();
  });
});
