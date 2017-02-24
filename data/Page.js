import { createLoader } from 'data';
import Model from 'data/Model';

let pageLoader;
const path = process.env.WP_PAGES_ENDPOINT || 'wp/v2/pages';

class Page extends Model {
  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await pageLoader.load(id);
    return data ? Object.assign(new Page(), data) : null;
  }
}

pageLoader = createLoader(Page);

export default Page;
