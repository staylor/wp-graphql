import fields from 'field/taxonomy';

describe('Test schema type field definition', () => {
  test('Test taxonomy field', () => {
    expect(fields.taxonomy.type.name).toMatchSnapshot();
  });

  test('Test taxonomy field resolver', async () => {
    expect.assertions(1);
    return expect(
      fields.taxonomy.resolve({ taxonomy: 'tag' })
    ).resolves.toMatchSnapshot();
  });

  test('Test count field', () => {
    expect(fields.count.type).toMatchSnapshot();
  });
});
