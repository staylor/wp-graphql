import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';
import { decodeIDs } from 'utils';

const path = process.env.WP_USERS_ENDPOINT || 'wp/v2/users';
const userLoader = new Dataloader(opaque =>
  fetchData(path, { qs: { include: decodeIDs(opaque), orderby: 'include' } }).then(
    ({ data: { body } }) => body,
  ),
);
const slugLoader = new Dataloader(slugs =>
  Promise.all(
    slugs.map(slug => fetchData(path, { qs: { slug } }).then(({ data: { body } }) => body[0])),
  ),
);

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

  static async loadBySlug(slug) {
    const data = await slugLoader.load(slug);
    return data ? Object.assign(new User(), data) : null;
  }

  static async collection(args = {}) {
    const { data: { body, headers } } = await fetchData(path, args);
    return {
      total: headers['x-wp-total'],
      items: body.map(item => Object.assign(new User(), item)),
    };
  }
}

export default User;
