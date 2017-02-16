import { createLoader } from 'data';
import Model from 'data/Model';

const taxonomyLoader = createLoader('/taxonomies');

export default class Taxonomy extends Model {
  static async load(id) {
    const data = await taxonomyLoader.load(id);
    return data ? Object.assign(new Taxonomy(), data) : null;
  }
}
