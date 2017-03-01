import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { decodeIDs, loadEdges } from 'utils';

let typeLoader;
const path = process.env.WP_TYPES_ENDPOINT || 'wp/v2/types';

class Type {
  getID() {
    return toGlobalId(this.constructor.name, this.slug);
  }

  static getEndpoint() {
    return path;
  }

  static getBatchKey() {
    return 'type';
  }

  static resolveBatchParams(key, ids) {
    return {
      [this.constructor.getBatchKey()]: decodeIDs(ids),
    };
  }

  static async load(id) {
    const data = await typeLoader.load(id);
    return data ? Object.assign(new Type(), data) : null;
  }
}

const edgeLoader = loadEdges(Type);
typeLoader = new Dataloader((opaque) => {
  const args = {};
  const root = { args };
  return edgeLoader(root, args)
    .then(({ edges }) => {
      const nodes = edges.map(({ node }) => node);
      const ids = decodeIDs(opaque);
      return ids.map(id => nodes.find(node => id === node.slug));
    });
});

export default Type;
