import Dataloader from 'dataloader';
import request from 'data';
import { toBase64, decodeIDs } from 'utils';

const userLoader = (
  new Dataloader(ids => request('/users', { qs: { include: decodeIDs(ids) } }))
);

export default class User {
  getID() {
    return toBase64(`user:${this.id}`);
  }

  static async load(id) {
    const data = await userLoader.load(id);
    return data ? Object.assign(new User(), data) : null;
  }
}
