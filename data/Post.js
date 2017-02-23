import { createLoader } from 'data';
import Model from 'data/Model';

const path = process.env.WP_POSTS_ENDPOINT || 'wp/v2/posts';
const postLoader = createLoader(path);

export default class Post extends Model {
  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await postLoader.load(id);
    return data ? Object.assign(new Post(), data) : null;
  }
}
