import { toGlobalId } from 'graphql-relay';

const path = process.env.WP_USERS_ENDPOINT || 'wp/v2/users';

class User {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getEndpoint() {
    return path;
  }
}

export default User;
