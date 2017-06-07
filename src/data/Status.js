import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';

// Dataloader expects IDs that can be read by the REST API

const path = process.env.WP_STATUSES_ENDPOINT || 'wp/v2/statuses';
const statusLoader = new Dataloader(slugs =>
  fetchData(path, {}, 1000 * 60 * 10).then(({ data: { body } }) => slugs.map(slug => body[slug]))
);

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

  static async collection(args = {}) {
    const { data: { body } } = await fetchData(path, args);
    return Object.keys(body).map(key => Object.assign(new Status(), body[key]));
  }
}

export default Status;
