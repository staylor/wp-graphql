import { toGlobalId } from 'graphql-relay';

const path = process.env.WP_TAGS_ENDPOINT || 'wp/v2/tags';

class Tag {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getEndpoint() {
    return path;
  }
}

export default Tag;
