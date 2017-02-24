import { createLoader } from 'data';
import Model from 'data/Model';

let tagLoader;
const path = process.env.WP_TAGS_ENDPOINT || 'wp/v2/tags';

class Tag extends Model {
  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await tagLoader.load(id);
    return data ? Object.assign(new Tag(), data) : null;
  }
}

tagLoader = createLoader(Tag);

export default Tag;
