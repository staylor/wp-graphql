import { toGlobalId } from 'graphql-relay';

const path = process.env.WP_MEDIA_ENDPOINT || 'wp/v2/media';

class Media {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getEndpoint() {
    return path;
  }
}

export default Media;
