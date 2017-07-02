import { toGlobalId } from 'graphql-relay';

const path = process.env.WP_PAGES_ENDPOINT || 'wp/v2/pages';

class Page {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getEndpoint() {
    return path;
  }
}

export default Page;
