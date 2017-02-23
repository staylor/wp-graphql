import { createLoader } from 'data';
import Model from 'data/Model';

const path = process.env.WP_USERS_ENDPOINT || 'wp/v2/users';
const userLoader = createLoader(path);

export default class User extends Model {
  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await userLoader.load(id);
    return data ? Object.assign(new User(), data) : null;
  }
}
