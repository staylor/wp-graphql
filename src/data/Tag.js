import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import fetchData from 'data/utils';

// Dataloader expects IDs that can be read by the REST API

const path = process.env.WP_TAGS_ENDPOINT || 'wp/v2/tags';
const tagLoader = new Dataloader(ids =>
  fetchData(path, {
    qs: { include: ids, per_page: 100, orderby: 'include' },
  }).then(({ data: { body } }) => body)
);
const slugLoader = new Dataloader(slugs =>
  fetchData(path, { qs: { slug: slugs, per_page: 100 } })
    .then(({ data: { body } }) => body)
    // the REST API does not order by FIELD(slug, ....) yet
    .then(tags => slugs.map(slug => tags.find(tag => slug === tag.slug)))
);

class Tag {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await tagLoader.load(id);
    return data ? Object.assign(new Tag(), data) : null;
  }

  static async loadMany(ids) {
    const data = await tagLoader.loadMany(ids);
    return data ? data.map(entry => Object.assign(new Tag(), entry)) : null;
  }

  static async loadBySlug(slug) {
    const data = await slugLoader.load(slug);
    return data ? Object.assign(new Tag(), data) : null;
  }
}

export default Tag;
