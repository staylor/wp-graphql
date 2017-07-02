import Taxonomy from 'data/Taxonomy';

describe('Test Taxonomy data access', () => {
  test('Get endpoint', () => {
    expect(Taxonomy.getEndpoint()).toMatchSnapshot();
  });
});
