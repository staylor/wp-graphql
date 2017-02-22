import { createLoader } from 'data';
import Model from 'data/Model';

const navMenuLoader = createLoader('/nav-menus');

export default class NavMenu extends Model {
  static async load(id) {
    const data = await navMenuLoader.load(id);
    return data ? Object.assign(new NavMenu(), data) : null;
  }
}
