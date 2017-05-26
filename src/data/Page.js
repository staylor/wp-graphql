import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';
import { decodeIDs } from 'utils';

const path = process.env.WP_PAGES_ENDPOINT || 'wp/v2/pages';
const pageLoader = new Dataloader(opaque =>
  fetchData(path, { qs: { include: decodeIDs(opaque), orderby: 'include' } }).then(
    ({ data: { body } }) => body,
  ),
);
const slugLoader = new Dataloader(slugs =>
  fetchData(path, { qs: { slug: slugs } }).then(({ data: { body } }) => body),
);

class Page {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await pageLoader.load(id);
    return data ? Object.assign(new Page(), data) : null;
  }

  static async loadBySlug(slug) {
    const data = await slugLoader.load(slug);
    return data ? Object.assign(new Page(), data) : null;
  }

  static async collection(args = {}) {
    const { data: { body, headers } } = await fetchData(path, args);
    return {
      total: headers['x-wp-total'],
      items: body.map(item => Object.assign(new Page(), item)),
    };
  }
}

export default Page;
