import { toGlobalId } from 'utils';

export default class Model {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }
}
