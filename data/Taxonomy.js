import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { decodeIDs, loadEdges } from 'utils';

let taxonomyLoader;
const path = process.env.WP_TAXONOMIES_ENDPOINT || 'wp/v2/taxonomies';

class Taxonomy {
  getID() {
    return toGlobalId(this.constructor.name, this.slug);
  }

  static getEndpoint() {
    return path;
  }

  static getBatchKey() {
    return 'taxonomy';
  }

  static resolveBatchParams(key, ids) {
    return {
      [this.constructor.getBatchKey()]: decodeIDs(ids),
    };
  }

  static async load(id) {
    const data = await taxonomyLoader.load(id);
    return data ? Object.assign(new Taxonomy(), data) : null;
  }
}

const edgeLoader = loadEdges(Taxonomy);
taxonomyLoader = new Dataloader((opaque) => {
  const args = {};
  const root = { args };
  return edgeLoader(root, args)
    .then(({ edges }) => {
      const nodes = edges.map(({ node }) => node);
      const ids = decodeIDs(opaque);
      return ids.map(id => nodes.find(node => id === node.slug));
    });
});

export default Taxonomy;
