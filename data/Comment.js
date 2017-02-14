import Dataloader from 'dataloader';
import request from 'data';
import { toBase64, decodeIDs } from 'utils';

const commentLoader = (
  new Dataloader(ids => request('/comments', { qs: { include: decodeIDs(ids) } }))
);

export default class Comment {
  getID() {
    return toBase64(`comment:${this.id}`);
  }

  static async load(id) {
    const data = await commentLoader.load(id);
    return data ? Object.assign(new Comment(), data) : null;
  }
}
