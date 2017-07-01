import fields from 'field/author';

describe('Test schema type field definition', () => {
  test('Test author field', () => {
    expect(fields.author.type.name).toMatchSnapshot();
  });

  test('Test resolve author field', async () => {
    expect.assertions(1);
    return expect(fields.author.resolve({ author: 1 })).resolves.toMatchSnapshot();
  });

  test('Test resolve author field null', () => {
    expect(fields.author.resolve({ author: 0 })).toBeNull();
  });
});
