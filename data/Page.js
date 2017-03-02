import { createLoader } from 'data';
import Model from 'data/Model';
import { decodeIDs } from 'utils';

let pageLoader;
let slugLoader;
const path = process.env.WP_PAGES_ENDPOINT || 'wp/v2/pages';

class Page extends Model {
  static getEndpoint() {
    return path;
  }

  static resolveBatchParams(key, ids) {
    if (key === 'slug') {
      return { slug: ids };
    }

    console.log(this.constructor.name);
    return {
      [this.constructor.getBatchKey()]: decodeIDs(ids),
    };
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

pageLoader = createLoader(Page, 'id');
slugLoader = createLoader(Page, 'slug');

export default Page;
