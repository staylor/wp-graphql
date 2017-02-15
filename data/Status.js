import Dataloader from 'dataloader';
import request from 'data';
import { decodeIDs } from 'utils';
import Model from './Model';

const statusLoader = (
  new Dataloader(ids => request('/statuses', { qs: { include: decodeIDs(ids) } }))
);

export default class Status extends Model {
  static async load(id) {
    const data = await statusLoader.load(id);
    return data ? Object.assign(new Status(), data) : null;
  }
}
