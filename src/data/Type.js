import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';

// Dataloader expects IDs that can be read by the REST API

// there is no batch mechanism on this endpoint
const path = process.env.WP_TYPES_ENDPOINT || 'graphql/v1/types';
const typeLoader = new Dataloader(slugs =>
  fetchData(path, {}).then(({ data: { body } }) => slugs.map(slug => body[slug]))
);

class Type {
  getID() {
    return toGlobalId(this.constructor.name, this.slug);
  }

  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await typeLoader.load(id);
    return data ? Object.assign(new Type(), data) : null;
  }

  static async collection(args = {}) {
    const { data: { body } } = await fetchData(path, args);
    return Object.keys(body).map(key => Object.assign(new Type(), body[key]));
  }
}

export default Type;
