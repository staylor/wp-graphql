import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';
import { decodeIDs } from 'utils';

const path = process.env.WP_USERS_ENDPOINT || 'wp/v2/users';
const userLoader = new Dataloader(opaque => (
  fetchData(path, { qs: { include: decodeIDs(opaque) } })
    .then(({ data: { body } }) => body)
));

class User {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await userLoader.load(id);
    return data ? Object.assign(new User(), data) : null;
  }
}

export default User;
