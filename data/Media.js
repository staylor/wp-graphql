import Dataloader from 'dataloader';
import request from 'data';
import { toBase64, decodeIDs } from 'utils';

const mediaLoader = (
  new Dataloader(ids => request('/media', { qs: { include: decodeIDs(ids) } }))
);

export default class Media {
  getID() {
    return toBase64(`media:${this.id}`);
  }

  static async load(id) {
    const data = await mediaLoader.load(id);
    return data ? Object.assign(new Media(), data) : null;
  }
}
