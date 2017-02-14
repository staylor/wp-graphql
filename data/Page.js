import Dataloader from 'dataloader';
import request from 'data';
import { toBase64, decodeIDs } from 'utils';

const pageLoader = (
  new Dataloader(ids => request('/pages', { qs: { include: decodeIDs(ids) } }))
);

export default class Page {
  getID() {
    return toBase64(`page:${this.id}`);
  }

  static async load(id) {
    const data = await pageLoader.load(id);
    return data ? Object.assign(new Page(), data) : null;
  }
}
