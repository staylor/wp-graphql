import Settings from 'data/Settings';

describe('Test Settings data access', () => {
  test('Get endpoint', () => {
    expect(Settings.getEndpoint()).toMatchSnapshot();
  });

  test('Load settings', async () => {
    const settings = await Settings.load();
    expect(settings.getID()).toMatchSnapshot();
    expect(settings).toMatchSnapshot();
  });
});
