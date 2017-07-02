import Settings from 'data/Settings';

describe('Test Settings data access', () => {
  test('Get endpoint', () => {
    expect(Settings.getEndpoint()).toMatchSnapshot();
  });
});
