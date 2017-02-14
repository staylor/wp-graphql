import Dataloader from 'dataloader';
import request from 'data';
import { toBase64, decodeIDs } from 'utils';

const tagLoader = (
  new Dataloader(ids => request('/tags', { qs: { include: decodeIDs(ids) } }))
);

export default class Tag {
  getID() {
    return toBase64(`tag:${this.id}`);
  }

  static async load(id) {
    const data = await tagLoader.load(id);
    return data ? Object.assign(new Tag(), data) : null;
  }
}
