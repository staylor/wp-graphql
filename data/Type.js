import Dataloader from 'dataloader';
import request from 'data';
import { decodeIDs } from 'utils';
import Model from './Model';

const typeLoader = (
  new Dataloader(ids => request('/types', { qs: { include: decodeIDs(ids) } }))
);

export default class Type extends Model {
  static async load(id) {
    const data = await typeLoader.load(id);
    return data ? Object.assign(new Type(), data) : null;
  }
}
