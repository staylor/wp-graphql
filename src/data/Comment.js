import path from 'path';
import { toGlobalId, fromGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';
import { decodeIDs } from 'utils';

const commentsEndpoint = process.env.WP_COMMENTS_ENDPOINT || 'wp/v2/comments';
const commentLoader = new Dataloader(opaque =>
  fetchData(commentsEndpoint, { qs: { include: decodeIDs(opaque), orderby: 'include' } }).then(
    ({ data: { body } }) => body,
  ),
);

class Comment {
  getID() {
    return toGlobalId(this.constructor.name, this.id);
  }

  static getEndpoint() {
    return commentsEndpoint;
  }

  static async load(id) {
    const data = await commentLoader.load(id);
    return data ? Object.assign(new Comment(), data) : null;
  }

  static async collection(opts = {}) {
    const args = { qs: opts };
    const { data: { body, headers } } = await fetchData(commentsEndpoint, args);
    return {
      total: headers['x-wp-total'],
      items: body.map(item => Object.assign(new Comment(), item)),
    };
  }

  static async create(input) {
    if (!input.author && !(input.author_email && input.author_name)) {
      return Promise.reject('You must provide author data to create a comment.');
    }

    if (!input.post) {
      return Promise.reject('You must provide a post to assign the comment to.');
    }

    // eslint-disable-next-line no-param-reassign
    input.post = fromGlobalId(input.post).id;
    if (input.parent) {
      // eslint-disable-next-line no-param-reassign
      input.parent = fromGlobalId(input.parent).id;
    }

    try {
      const { data: { body: comment, headers } } = await fetchData(commentsEndpoint, {
        method: 'POST',
        form: input,
      });

      if (comment) {
        return {
          status: 'new',
          comment: Object.assign(new Comment(), comment),
          cookies: headers['set-cookie'],
        };
      }

      return {
        comment: null,
        status: 'new',
        cookies: null,
      };
    } catch (e) {
      return {
        comment: null,
        status: e.message || 'There were errors.',
        cookies: null,
      };
    }
  }

  static async update(input) {
    if (!input.id) {
      return Promise.reject('You must specify a comment ID to update.');
    }

    const { id } = fromGlobalId(input.id);
    const updateEndpoint = path.join(commentsEndpoint, id);
    // eslint-disable-next-line no-param-reassign
    delete input.id;

    try {
      const { data: { body: comment, headers } } = await fetchData(updateEndpoint, {
        method: 'POST',
        form: input,
      });

      if (comment) {
        return {
          status: 'update',
          comment: Object.assign(new Comment(), comment),
          cookies: headers['set-cookie'],
        };
      }

      return {
        comment: null,
        status: 'update',
        cookies: null,
      };
    } catch (e) {
      return {
        comment: null,
        status: e.message,
        cookies: null,
      };
    }
  }
}

export default Comment;
