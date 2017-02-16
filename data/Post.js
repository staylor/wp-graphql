import { createLoader } from 'data';
import Model from 'data/Model';

const postLoader = createLoader('/posts');

export default class Post extends Model {
  static async load(id) {
    const data = await postLoader.load(id);
    return data ? Object.assign(new Post(), data) : null;
  }
}
