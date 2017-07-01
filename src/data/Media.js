import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import fetchData from 'data/utils';

// Dataloader expects IDs that can be read by the REST API

const path = process.env.WP_MEDIA_ENDPOINT || 'wp/v2/media';
const mediaLoader = new Dataloader(ids =>
  fetchData(path, {
    qs: { include: ids, orderby: 'include', per_page: 100 },
  }).then(({ data: { body } }) => body)
);
const slugLoader = new Dataloader(slugs =>
  fetchData(path, { qs: { slug: slugs, orderby: 'slug', per_page: 100 } }).then(
    ({ data: { body } }) => body
  )
);

class Media {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await mediaLoader.load(id);
    return data ? Object.assign(new Media(), data) : null;
  }

  static async loadBySlug(slug) {
    const data = await slugLoader.load(slug);
    return data ? Object.assign(new Media(), data) : null;
  }
}

export default Media;
