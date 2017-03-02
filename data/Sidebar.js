import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';
import { decodeIDs } from 'utils';

const path = process.env.WP_SIDEBARS_ENDPOINT || null;
if (!path) {
  throw Error('This endpoint does not exist in WordPress yet. ' +
    'You must install the WordPres GraphQL Middleware plugin.');
}
const sidebarLoader = new Dataloader(opaque => (
  fetchData(path, { qs: { include: decodeIDs(opaque) } })
    .then(({ data: { body } }) => body)
));

class Sidebar {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static async load(id) {
    const data = await sidebarLoader.load(id);
    return data ? Object.assign(new Sidebar(), data) : null;
  }
}

export default Sidebar;
