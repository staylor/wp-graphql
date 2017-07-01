import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import fetchData from 'data/utils';

// Dataloader expects IDs that can be read by the REST API

const path = process.env.WP_PAGES_ENDPOINT || 'wp/v2/pages';
const pageLoader = new Dataloader(ids =>
  fetchData(path, {
    qs: { include: ids, orderby: 'include', per_page: 100 },
  }).then(({ data: { body } }) => body)
);
const slugLoader = new Dataloader(slugs =>
  fetchData(path, { qs: { slug: slugs } })
    .then(({ data: { body } }) => body)
    // the REST API does not order by FIELD(slug, ....) yet
    .then(pages => slugs.map(slug => pages.find(page => slug === page.slug)))
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
}

export default Page;
