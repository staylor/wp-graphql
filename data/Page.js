import { createLoader } from 'data';
import Model from 'data/Model';

const pageLoader = createLoader('/pages');

export default class Page extends Model {
  static async load(id) {
    const data = await pageLoader.load(id);
    return data ? Object.assign(new Page(), data) : null;
  }
}
