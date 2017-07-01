import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import fetchData from 'data/utils';

// Dataloader expects IDs that can be read by the REST API

// there is no batch mechanism on this endpoint
const path = process.env.WP_SETTINGS_ENDPOINT || 'graphql/v1/settings';
const settingsLoader = new Dataloader(settingsPaths =>
  Promise.all(
    settingsPaths.map(settingsPath =>
      fetchData(settingsPath).then(({ data: { body } }) => body)
    )
  )
);

class Settings {
  getID() {
    return toGlobalId(this.constructor.name, 'me');
  }

  static getEndpoint() {
    return path;
  }

  static async load() {
    const settings = await settingsLoader.load(path);
    return settings ? Object.assign(new Settings(), settings) : null;
  }
}

export default Settings;
