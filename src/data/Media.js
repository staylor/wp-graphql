import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';
import { decodeIDs } from 'utils';

const path = process.env.WP_MEDIA_ENDPOINT || 'wp/v2/media';
const mediaLoader = new Dataloader(opaque => (
  fetchData(path, { qs: { include: decodeIDs(opaque), orderby: 'include' } })
    .then(({ data: { body } }) => body)
));

class Media {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await mediaLoader.load(id);
    return data ? Object.assign(new Media(), data) : null;
  }

  static async collection(args = {}) {
    const { data: { body, headers } } = await fetchData(path, args);
    return {
      total: headers['x-wp-total'],
      items: body.map(item => Object.assign(new Media(), item)),
    };
  }
}

export default Media;
