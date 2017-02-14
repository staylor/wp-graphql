import Dataloader from 'dataloader';
import request from 'data';
import { toBase64, decodeIDs } from 'utils';

const categoryLoader = (
  new Dataloader(ids => request('/categories', { qs: { include: decodeIDs(ids) } }))
);

export default class Category {
  getID() {
    return toBase64(`category:${this.id}`);
  }

  static async load(id) {
    const data = await categoryLoader.load(id);
    return data ? Object.assign(new Category(), data) : null;
  }
}
