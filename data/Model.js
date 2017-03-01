import { toGlobalId } from 'graphql-relay';
import { decodeIDs } from 'utils';

export default class Model {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getBatchKey() {
    return 'include';
  }

  static resolveBatchParams(key, ids) {
    const method = this.constructor.getBatchKey ?
      this.constructor.getBatchKey :
      Model.getBatchKey;
    return {
      [method()]: decodeIDs(ids),
    };
  }
}
