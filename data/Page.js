import Dataloader from 'dataloader';
import request from 'data';
import { decodeIDs } from 'utils';
import Model from './Model';

const pageLoader = (
  new Dataloader(ids => request('/pages', { qs: { include: decodeIDs(ids) } }))
);

export default class Page extends Model {
  static async load(id) {
    const data = await pageLoader.load(id);
    return data ? Object.assign(new Page(), data) : null;
  }
}
