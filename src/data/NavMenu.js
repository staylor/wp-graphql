import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';
import { decodeIDs } from 'utils';

const path = process.env.WP_NAV_MENUS_ENDPOINT || null;
if (!path) {
  throw Error(
    'This endpoint does not exist in WordPress yet. ' +
      'You must install the WordPres GraphQL Middleware plugin.',
  );
}
const navMenuLoader = new Dataloader(opaque =>
  fetchData(path).then(({ data: { body } }) =>
    decodeIDs(opaque).map(id => parseInt(id, 10)).map(id => body.find(item => item.id === id)),
  ),
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
