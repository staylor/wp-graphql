import { createLoader } from 'data';
import Model from 'data/Model';

const statusLoader = createLoader('/statuses');

export default class Status extends Model {
  static async load(id) {
    const data = await statusLoader.load(id);
    return data ? Object.assign(new Status(), data) : null;
  }
}
