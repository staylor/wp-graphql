import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import fetchData from 'data/utils';

// Dataloader expects IDs that can be read by the REST API

const path = process.env.WP_CATEGORIES_ENDPOINT || 'wp/v2/categories';
const categoryLoader = new Dataloader(ids =>
  fetchData(path, {
    qs: { include: ids, orderby: 'include', per_page: 100 },
  }).then(({ data: { body } }) => body)
);
const slugLoader = new Dataloader(slugs =>
  fetchData(path, { qs: { slug: slugs, per_page: 100 } })
    .then(({ data: { body } }) => body)
    // the REST API does not order by FIELD(slug, ....) yet
    .then(categories => slugs.map(slug => categories.find(cat => slug === cat.slug)))
);

class Category {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await categoryLoader.load(id);
    return data ? Object.assign(new Category(), data) : null;
  }

  static async loadMany(ids) {
    const data = await categoryLoader.loadMany(ids);
    return data ? data.map(entry => Object.assign(new Category(), entry)) : null;
  }

  static async loadBySlug(slug) {
    const data = await slugLoader.load(slug);
    return data ? Object.assign(new Category(), data) : null;
  }
}

export default Category;
