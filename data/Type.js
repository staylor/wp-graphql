import { createLoader } from 'data';
import Model from 'data/Model';

const typeLoader = createLoader('/types');

export default class Type extends Model {
  static async load(id) {
    const data = await typeLoader.load(id);
    return data ? Object.assign(new Type(), data) : null;
  }
}
