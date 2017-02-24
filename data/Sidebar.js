import { createLoader } from 'data';
import Model from 'data/Model';

let sidebarLoader;
const path = process.env.WP_SIDEBARS_ENDPOINT || null;
if (!path) {
  throw Error('This endpoint does not exist in WordPress yet.');
}

class Sidebar extends Model {
  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await sidebarLoader.load(id);
    return data ? Object.assign(new Sidebar(), data) : null;
  }
}

sidebarLoader = createLoader(Sidebar);

export default Sidebar;
