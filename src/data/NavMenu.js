import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';

// Dataloader expects IDs that can be read by the REST API

const path = process.env.WP_NAV_MENUS_ENDPOINT || null;
if (!path) {
  throw Error(
    'This endpoint does not exist in WordPress yet. ' +
      'You must install the WordPres GraphQL Middleware plugin.'
  );
}
const navMenuLoader = new Dataloader(ids =>
  fetchData(path)
    .then(({ data: { body } }) => body)
    .then(menus => ids.map(id => menus.find(item => item.id === parseInt(id, 10))))
);

class NavMenu {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await navMenuLoader.load(id);
    return data ? Object.assign(new NavMenu(), data) : null;
  }

  static async collection(args = {}) {
    const { data: { body, headers } } = await fetchData(path, args);
    return {
      total: headers['x-wp-total'],
      items: body.map(item => Object.assign(new NavMenu(), item)),
    };
  }
}

export default NavMenu;
