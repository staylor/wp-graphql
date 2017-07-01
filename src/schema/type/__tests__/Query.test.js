import QueryType from 'type/Query';

describe('Test Query type', () => {
  test('Test name', () => {
    expect(QueryType.name).toMatchSnapshot();
  });

  test('Test fields', () => {
    expect(Object.keys(QueryType.getFields())).toMatchSnapshot();
  });
});
