import Dataloader from 'dataloader';
import request from 'data';
import { toBase64, decodeIDs } from 'utils';

const postLoader = (
  new Dataloader(ids => request('/posts', { qs: { include: decodeIDs(ids) } }))
);

export default class Post {
  getID() {
    return toBase64(`post:${this.id}`);
  }

  static async load(id) {
    const data = await postLoader.load(id);
    return data ? Object.assign(new Post(), data) : null;
  }
}
