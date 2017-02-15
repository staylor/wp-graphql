import Dataloader from 'dataloader';
import request from 'data';
import { decodeIDs } from 'utils';
import Model from './Model';

const postLoader = (
  new Dataloader(ids => request('/posts', { qs: { include: decodeIDs(ids) } }))
);

export default class Post extends Model {
  static async load(id) {
    const data = await postLoader.load(id);
    return data ? Object.assign(new Post(), data) : null;
  }
}
