import { createLoader } from 'data';
import Model from 'data/Model';

const path = process.env.WP_CATEGORIES_ENDPOINT || 'wp/v2/categories';
const categoryLoader = createLoader(path);

export default class Category extends Model {
  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await categoryLoader.load(id);
    return data ? Object.assign(new Category(), data) : null;
  }
}
