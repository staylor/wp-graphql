import { toGlobalId } from 'graphql-relay';

const path = process.env.WP_CATEGORIES_ENDPOINT || 'wp/v2/categories';

class Category {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getEndpoint() {
    return path;
  }
}

export default Category;
