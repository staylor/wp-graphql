import { toGlobalId } from 'graphql-relay';

const path = process.env.WP_SETTINGS_ENDPOINT || 'graphql/v1/settings';

class Settings {
  getID() {
    return toGlobalId(this.constructor.name, 'me');
  }

  static getEndpoint() {
    return path;
  }
}

export default Settings;
