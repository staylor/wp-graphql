import { createLoader } from 'data';
import Model from 'data/Model';

const userLoader = createLoader('/users');

export default class User extends Model {
  static async load(id) {
    const data = await userLoader.load(id);
    return data ? Object.assign(new User(), data) : null;
  }
}
