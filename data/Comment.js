import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';
import { decodeIDs } from 'utils';

const path = process.env.WP_COMMENTS_ENDPOINT || 'wp/v2/comments';
const commentLoader = new Dataloader(opaque => (
  fetchData(path, { qs: { include: decodeIDs(opaque) } })
    .then(({ data: { body } }) => body)
));

class Comment {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await commentLoader.load(id);
    return data ? Object.assign(new Comment(), data) : null;
  }

  static async collection(args = {}) {
    const { data: { body, headers } } = await fetchData(path, args);
    return {
      total: headers['x-wp-total'],
      items: body.map(item => Object.assign(new Comment(), item)),
    };
  }
}

export default Comment;
