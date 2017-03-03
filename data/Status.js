import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';
import { decodeIDs } from 'utils';

const path = process.env.WP_STATUSES_ENDPOINT || 'wp/v2/statuses';
const statusLoader = new Dataloader(opaque => (
  fetchData(path, {}, 1000 * 60 * 10)
    .then(({ data: { body } }) => decodeIDs(opaque).map(slug => body[slug]))
));

class Status {
  getID() {
    return toGlobalId(this.constructor.name, this.slug);
  }

  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await statusLoader.load(id);
    return data ? Object.assign(new Status(), data) : null;
  }
}

export default Status;
