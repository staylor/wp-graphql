import Dataloader from 'dataloader';
import request from 'data';
import { toBase64, decodeIDs } from 'utils';

const typeLoader = (
  new Dataloader(ids => request('/types', { qs: { include: decodeIDs(ids) } }))
);

export default class Type {
  getID() {
    return toBase64(`type:${this.id}`);
  }

  static async load(id) {
    const data = await typeLoader.load(id);
    return data ? Object.assign(new Type(), data) : null;
  }
}
