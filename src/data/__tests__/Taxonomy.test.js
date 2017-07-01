import Taxonomy from 'data/Taxonomy';

describe('Test Taxonomy data access', () => {
  test('Get endpoint', () => {
    expect(Taxonomy.getEndpoint()).toMatchSnapshot();
  });

  test('Load a taxonomy', async () => {
    const tax = await Taxonomy.load('tag');
    expect(tax.getID()).toMatchSnapshot();
    expect(tax).toMatchSnapshot();
  });
});
