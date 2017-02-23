import { createLoader } from 'data';
import Model from 'data/Model';

const path = process.env.WP_TAXONOMIES_ENDPOINT || 'wp/v2/taxonomies';
const taxonomyLoader = createLoader(path);

export default class Taxonomy extends Model {
  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await taxonomyLoader.load(id);
    return data ? Object.assign(new Taxonomy(), data) : null;
  }
}
