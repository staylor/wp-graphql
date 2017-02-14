import Dataloader from 'dataloader';
import request from 'data';
import { toBase64, decodeIDs } from 'utils';

const taxonomyLoader = (
  new Dataloader(ids => request('/taxonomies', { qs: { include: decodeIDs(ids) } }))
);

export default class Taxonomy {
  getID() {
    return toBase64(`taxonomy:${this.id}`);
  }

  static async load(id) {
    const data = await taxonomyLoader.load(id);
    return data ? Object.assign(new Taxonomy(), data) : null;
  }
}
