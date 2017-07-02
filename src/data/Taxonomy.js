import { toGlobalId } from 'graphql-relay';

const path = process.env.WP_TAXONOMIES_ENDPOINT || 'graphql/v1/taxonomies';

class Taxonomy {
  getID() {
    return toGlobalId(this.constructor.name, this.slug);
  }

  static getEndpoint() {
    return path;
  }
}

export default Taxonomy;
