import path from 'path';
import { toGlobalId, fromGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';

// Dataloader expects IDs that can be read by the REST API

const commentsEndpoint = process.env.WP_COMMENTS_ENDPOINT || 'wp/v2/comments';
const commentLoader = new Dataloader(ids =>
  fetchData(commentsEndpoint, {
    qs: { include: ids, orderby: 'include' },
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

  // Mutations are responsible for deserializing IDs from the UI

  static async create(input) {
    if (!input.author && !(input.author_email && input.author_name)) {
      return Promise.reject('You must provide author data to create a comment.');
    }

    if (!input.post) {
      return Promise.reject('You must provide a post to assign the comment to.');
    }

    const form = Object.create({}, input);
    form.post = fromGlobalId(input.post).id;
    if (input.parent) {
      form.parent = fromGlobalId(input.parent).id;
    }

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
    if (!input.id) {
      return Promise.reject('You must specify a comment ID to update.');
    }

    const form = Object.create({}, input);
    const { id } = fromGlobalId(form.id);
    const updateEndpoint = path.join(commentsEndpoint, id);
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
    if (!input.id) {
      return Promise.reject('You must specify a comment ID to update.');
    }

    const form = Object.create({}, input);
    const { id } = fromGlobalId(form.id);
    const deleteEndpoint = path.join(commentsEndpoint, id);
    delete form.id;

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
