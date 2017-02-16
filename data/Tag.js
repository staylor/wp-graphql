import { createLoader } from 'data';
import Model from 'data/Model';

const tagLoader = createLoader('/tags');

export default class Tag extends Model {
  static async load(id) {
    const data = await tagLoader.load(id);
    return data ? Object.assign(new Tag(), data) : null;
  }
}
