import Dataloader from 'dataloader';
import fetchData from 'data/utils';
import Settings from 'data/Settings';

// there is no batch mechanism on this endpoint
const endpoint = Settings.getEndpoint();

// Dataloader expects IDs that can be read by the REST API

export default function getSettingsLoaders() {
  const settingsLoader = new Dataloader(settingsPaths =>
    Promise.all(
      settingsPaths.map(settingsPath =>
        fetchData(settingsPath).then(({ data: { body } }) => body)
      )
    )
  );

  return {
    load: async () => {
      const settings = await settingsLoader.load(endpoint);
      return settings ? Object.assign(new Settings(), settings) : null;
    },
  };
}
