import Dataloader from 'dataloader';
import request from 'data';
import { decodeIDs } from 'utils';
import Model from './Model';

const commentLoader = (
  new Dataloader(ids => request('/comments', { qs: { include: decodeIDs(ids) } }))
);

export default class Comment extends Model {
  static async load(id) {
    const data = await commentLoader.load(id);
    return data ? Object.assign(new Comment(), data) : null;
  }
}
