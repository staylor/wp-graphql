import { createLoader } from 'data';
import Model from 'data/Model';

const mediaLoader = createLoader('/media');

export default class Media extends Model {
  static async load(id) {
    const data = await mediaLoader.load(id);
    return data ? Object.assign(new Media(), data) : null;
  }
}
