import path from 'path';
import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';

// Dataloader expects IDs that can be read by the REST API

const commentsEndpoint = process.env.WP_COMMENTS_ENDPOINT || 'graphql/v1/comments';
const commentLoader = new Dataloader(ids =>
  fetchData(commentsEndpoint, {
    qs: { include: ids, orderby: 'include', per_page: 100 },
  }).then(({ data: { body } }) => body)
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

  static async create(form) {
    try {
      const { data: { body: comment, headers } } = await fetchData(commentsEndpoint, {
        method: 'POST',
        form,
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
    const form = Object.assign({}, input);
    const updateEndpoint = path.join(commentsEndpoint, form.id);
    delete form.id;

    try {
      const { data: { body: comment, headers } } = await fetchData(updateEndpoint, {
        method: 'POST',
        form,
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

  static async delete(input) {
    const form = Object.assign({}, input);
    const deleteEndpoint = path.join(commentsEndpoint, form.id);

    try {
      const { data: { body: comment } } = await fetchData(deleteEndpoint, {
        method: 'DELETE',
      });

      if (comment.deleted) {
        return {
          status: 'delete',
        };
      }

      return {
        status: 'delete',
      };
    } catch (e) {
      return {
        status: e.message,
      };
    }
  }
}

export default Comment;
