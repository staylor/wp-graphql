import Dataloader from 'dataloader';
import request from 'data';
import { decodeIDs } from 'utils';
import Model from './Model';

const taxonomyLoader = (
  new Dataloader(ids => request('/taxonomies', { qs: { include: decodeIDs(ids) } }))
);

export default class Taxonomy extends Model {
  static async load(id) {
    const data = await taxonomyLoader.load(id);
    return data ? Object.assign(new Taxonomy(), data) : null;
  }
}
