import { createLoader } from 'data';
import Model from 'data/Model';

const path = process.env.WP_MEDIA_ENDPOINT || 'wp/v2/media';
const mediaLoader = createLoader(path);

export default class Media extends Model {
  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await mediaLoader.load(id);
    return data ? Object.assign(new Media(), data) : null;
  }
}
