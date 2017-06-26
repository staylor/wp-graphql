import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';

// Dataloader expects IDs that can be read by the REST API

const path = process.env.WP_USERS_ENDPOINT || 'wp/v2/users';
const userLoader = new Dataloader(ids =>
  fetchData(path, {
    qs: { include: ids, orderby: 'include', per_page: 100 },
  }).then(({ data: { body } }) => body)
);
const slugLoader = new Dataloader(slugs =>
  fetchData(path, { qs: { slug: slugs } })
    .then(({ data: { body } }) => body)
    // the REST API does not order by FIELD(slug, ....) yet
    .then(users => slugs.map(slug => users.find(user => slug === user.slug)))
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
