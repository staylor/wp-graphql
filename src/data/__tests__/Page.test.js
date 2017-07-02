import Page from 'data/Page';

describe('Test Page data access', () => {
  test('Get endpoint', () => {
    expect(Page.getEndpoint()).toMatchSnapshot();
  });
});
