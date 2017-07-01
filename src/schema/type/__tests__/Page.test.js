import PageType from 'type/Page';

// eslint-disable-next-line no-underscore-dangle
const fields = PageType._typeConfig.fields();

describe('Test Page type', () => {
  test('Test name', () => {
    expect(PageType.name).toMatchSnapshot();
  });

  test('Test type', () => {
    expect(PageType.isTypeOf({ type: 'page' })).toBe(true);
  });

  test('Test fields', () => {
    expect(Object.keys(PageType.getFields())).toMatchSnapshot();
  });

  test('Test resolve parent', async () => {
    const parent = await fields.parent.resolve({ parent: 69 });
    expect(parent).toMatchSnapshot();
  });

  test('Test resolve parent null', () => {
    expect(fields.parent.resolve({ parent: 0 })).toBeNull();
  });
});
