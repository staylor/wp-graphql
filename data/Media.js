import Dataloader from 'dataloader';
import request from 'data';
import { decodeIDs } from 'utils';
import Model from './Model';

const mediaLoader = (
  new Dataloader(ids => request('/media', { qs: { include: decodeIDs(ids) } }))
);

export default class Media extends Model {
  static async load(id) {
    const data = await mediaLoader.load(id);
    return data ? Object.assign(new Media(), data) : null;
  }
}
