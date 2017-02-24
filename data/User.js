import { createLoader } from 'data';
import Model from 'data/Model';

let userLoader;
const path = process.env.WP_USERS_ENDPOINT || 'wp/v2/users';

class User extends Model {
  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await userLoader.load(id);
    return data ? Object.assign(new User(), data) : null;
  }
}

userLoader = createLoader(User);

export default User;
