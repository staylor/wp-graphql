import { createLoader } from 'data';
import Model from 'data/Model';

const categoryLoader = createLoader('/categories');

export default class Category extends Model {
  static async load(id) {
    const data = await categoryLoader.load(id);
    return data ? Object.assign(new Category(), data) : null;
  }
}
