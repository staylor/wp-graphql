import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';
import { decodeIDs } from 'utils';

const path = process.env.WP_CATEGORIES_ENDPOINT || 'wp/v2/categories';
const categoryLoader = new Dataloader(opaque => (
  fetchData(path, { qs: { include: decodeIDs(opaque) } })
    .then(({ data: { body } }) => body)
));

class Category {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static async load(id) {
    const data = await categoryLoader.load(id);
    return data ? Object.assign(new Category(), data) : null;
  }
}

export default Category;
