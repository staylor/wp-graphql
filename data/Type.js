import { createLoader } from 'data';
import Model from 'data/Model';

const path = process.env.WP_TYPES_ENDPOINT || 'wp/v2/types';
const typeLoader = createLoader(path);

export default class Type extends Model {
  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await typeLoader.load(id);
    return data ? Object.assign(new Type(), data) : null;
  }
}
