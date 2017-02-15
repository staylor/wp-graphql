import Dataloader from 'dataloader';
import request from 'data';
import { decodeIDs } from 'utils';
import Model from './Model';

const userLoader = (
  new Dataloader(ids => request('/users', { qs: { include: decodeIDs(ids) } }))
);

export default class User extends Model {
  static async load(id) {
    const data = await userLoader.load(id);
    return data ? Object.assign(new User(), data) : null;
  }
}
