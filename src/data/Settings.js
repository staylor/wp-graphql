import { toGlobalId } from 'graphql-relay';
import { fetchData } from 'data';

// Dataloader expects IDs that can be read by the REST API

// there is no batch mechanism on this endpoint
const path = process.env.WP_SETTINGS_ENDPOINT || 'graphql/v1/settings';

class Settings {
  getID() {
    return toGlobalId(this.constructor.name, 'me');
  }

  static getEndpoint() {
    return path;
  }

  static async load() {
    const { data: { body } } = await fetchData(path);
    return body;
  }
}

export default Settings;
