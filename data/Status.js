import { createLoader } from 'data';
import Model from 'data/Model';

const path = process.env.WP_STATUSES_ENDPOINT || 'wp/v2/statuses';
const statusLoader = createLoader(path);

export default class Status extends Model {
  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await statusLoader.load(id);
    return data ? Object.assign(new Status(), data) : null;
  }
}
