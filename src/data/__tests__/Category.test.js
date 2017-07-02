import Category from 'data/Category';

describe('Test Category data access', () => {
  test('Get endpoint', () => {
    expect(Category.getEndpoint()).toMatchSnapshot();
  });
});
