import Dataloader from 'dataloader';
import request from 'data';
import { decodeIDs } from 'utils';
import Model from './Model';

const tagLoader = (
  new Dataloader(ids => request('/tags', { qs: { include: decodeIDs(ids) } }))
);

export default class Tag extends Model {
  static async load(id) {
    const data = await tagLoader.load(id);
    return data ? Object.assign(new Tag(), data) : null;
  }
}
