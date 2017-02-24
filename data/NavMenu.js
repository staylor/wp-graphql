import { createLoader } from 'data';
import Model from 'data/Model';

let navMenuLoader;
const path = process.env.WP_NAV_MENUS_ENDPOINT || null;
if (!path) {
  throw Error('This endpoint does not exist in WordPress yet.');
}

class NavMenu extends Model {
  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await navMenuLoader.load(id);
    return data ? Object.assign(new NavMenu(), data) : null;
  }
}

navMenuLoader = createLoader(NavMenu);

export default NavMenu;
