import { createLoader } from 'data';
import Model from 'data/Model';

const sidebarLoader = createLoader('/sidebars');

export default class Sidebar extends Model {
  static async load(id) {
    const data = await sidebarLoader.load(id);
    return data ? Object.assign(new Sidebar(), data) : null;
  }
}
