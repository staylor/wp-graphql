import { GraphQLString, GraphQLID } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArraySlice,
  fromGlobalId,
} from 'graphql-relay';
import PostType from 'type/Post';
import Post from 'data/Post';
import POST_ORDERBY from 'enum/PostOrderby';
import ORDER from 'enum/Order';

const { connectionType: PostConnection } = connectionDefinitions({
  nodeType: PostType,
});

export { PostConnection };

export default {
  type: PostConnection,
  args: {
    search: {
      type: GraphQLString,
      description: 'Limit results to those matching a string.',
    },
    author: {
      type: GraphQLString,
      description:
        'Limit result set to items assigned to specific authors (value or comma-separated values).',
    },
    slug: {
      type: GraphQLString,
      description:
        'Limit result set to items with one or more specific slugs (value or comma-separated values).',
    },
    // value or comma-separated values
    category: {
      type: GraphQLID,
      description:
        'Limit result set to all items that have the specified term assigned in the categories taxonomy.',
    },
    categories: {
      type: GraphQLString,
      description:
        'Limit result set to all items that have the specified terms assigned in the categories taxonomy.',
    },
    tag: {
      type: GraphQLID,
      description:
        'Limit result set to all items that have the specified term assigned in the tags taxonomy.',
    },
    tags: {
      type: GraphQLString,
      description:
        'Limit result set to all items that have the specified terms assigned in the tags taxonomy.',
    },
    orderby: {
      type: POST_ORDERBY,
      description: 'Sort collection by object attribute.',
    },
    order: {
      type: ORDER,
      description: 'Order sort attribute ascending or descending.',
    },
    ...connectionArgs,
  },
  description: 'A list of results',
  resolve: (root, args) => {
    const connectionArguments = {};
    const params = Object.assign({}, args);
    if (params.first) {
      params.per_page = params.first;
      connectionArguments.first = params.first;
      params.order = 'ASC';
    } else if (params.last) {
      params.per_page = params.last;
      connectionArguments.last = params.last;
    } else {
      params.per_page = 10;
    }

    if (params.category) {
      params.categories = params.category;
      delete params.category;
    }

    if (params.tag) {
      params.tags = params.tag;
      delete params.tag;
    }

    ['categories', 'tags', 'author'].forEach(key => {
      if (params[key]) {
        params[key] = params[key].split(',').map(value => fromGlobalId(value).id);
      }
    });

    delete params.first;
    delete params.last;
    delete params.after;
    delete params.before;

    return Post.collection(params).then(({ items, total }) =>
      connectionFromArraySlice(items, connectionArguments, {
        arrayLength: total ? parseInt(total, 10) : items.length,
        sliceStart: params.offset || 0,
      })
    );
  },
};
