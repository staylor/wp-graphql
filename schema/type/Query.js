import querystring from 'querystring';

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import Post from './Post';
import CONTEXT from './Context';
import request from '../../data';

const getQueryParams = (args) => {
  const opts = {};
  let qs = '';
  if (args.context) {
    opts.context = args.context;
    qs = `?${querystring.stringify(opts)}`;
  }
  return qs;
};

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    posts: {
      args: {
        context: { type: CONTEXT },
      },
      type: new GraphQLList(Post),
      // eslint-disable-next-line no-confusing-arrow
      resolve: (root, args) => {
        const qs = getQueryParams(args);
        return request(`/posts${qs}`);
      },
    },
    post: {
      args: {
        id: { type: GraphQLInt },
        context: { type: CONTEXT },
      },
      // eslint-disable-next-line no-confusing-arrow
      resolve: (root, args) => {
        if (args.id) {
          const qs = getQueryParams(args);
          return request(`/posts/${args.id}${qs}`);
        }
        return null;
      },
    },
  }),
});

export default Query;
