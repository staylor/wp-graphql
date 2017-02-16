import { createLoader } from 'data';
import Model from 'data/Model';

const commentLoader = createLoader('/comments');

export default class Comment extends Model {
  static async load(id) {
    const data = await commentLoader.load(id);
    return data ? Object.assign(new Comment(), data) : null;
  }
}
