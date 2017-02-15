import Dataloader from 'dataloader';
import request from 'data';
import { decodeIDs } from 'utils';
import Model from './Model';

const categoryLoader = (
  new Dataloader(ids => request('/categories', { qs: { include: decodeIDs(ids) } }))
);

export default class Category extends Model {
  static async load(id) {
    const data = await categoryLoader.load(id);
    return data ? Object.assign(new Category(), data) : null;
  }
}
