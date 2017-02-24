import { toGlobalId } from 'graphql-relay';

export default class Model {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getBatchKey() {
    return 'include';
  }
}
