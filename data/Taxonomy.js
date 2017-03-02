import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';
import { decodeIDs } from 'utils';

// there is no batch mechanism on this endpoint
const path = process.env.WP_TAXONOMIES_ENDPOINT || 'wp/v2/taxonomies';
const taxonomyLoader = new Dataloader(opaque => (
  fetchData(path, {}, 1000 * 60 * 10)
    .then(({ data: { body } }) => decodeIDs(opaque).map(id => body[id]))
));

class Taxonomy {
  getID() {
    return toGlobalId(this.constructor.name, this.slug);
  }

  static async load(id) {
    const data = await taxonomyLoader.load(id);
    return data ? Object.assign(new Taxonomy(), data) : null;
  }
}

export default Taxonomy;
