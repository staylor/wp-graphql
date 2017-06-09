import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';

// Dataloader expects IDs that can be read by the REST API

const path = process.env.WP_POSTS_ENDPOINT || 'wp/v2/posts';
const postLoader = new Dataloader(ids =>
  fetchData(path, { qs: { include: ids, orderby: 'include' } }).then(({ data: { body } }) => body)
);
const slugLoader = new Dataloader(slugs =>
  fetchData(path, { qs: { slug: slugs, orderby: 'slug' } }).then(({ data: { body } }) => body)
);

class Post {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await postLoader.load(id);
    return data ? Object.assign(new Post(), data) : null;
  }

  static async loadBySlug(slug) {
    const data = await slugLoader.load(slug);
    return data ? Object.assign(new Post(), data) : null;
  }

  static async collection(args = {}) {
    const { data: { body, headers } } = await fetchData(path, { qs: args });
    return {
      total: headers['x-wp-total'],
      items: body.map(item => Object.assign(new Post(), item)),
    };
  }
}

export default Post;
