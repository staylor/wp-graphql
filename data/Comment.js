import { createLoader } from 'data';
import Model from 'data/Model';

let commentLoader;
const path = process.env.WP_COMMENTS_ENDPOINT || 'wp/v2/comments';

class Comment extends Model {
  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await commentLoader.load(id);
    return data ? Object.assign(new Comment(), data) : null;
  }
}

commentLoader = createLoader(Comment);

export default Comment;
