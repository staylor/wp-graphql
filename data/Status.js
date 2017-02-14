import Dataloader from 'dataloader';
import request from 'data';
import { toBase64, decodeIDs } from 'utils';

const statusLoader = (
  new Dataloader(ids => request('/statuses', { qs: { include: decodeIDs(ids) } }))
);

export default class Status {
  getID() {
    return toBase64(`status:${this.id}`);
  }

  static async load(id) {
    const data = await statusLoader.load(id);
    return data ? Object.assign(new Status(), data) : null;
  }
}
