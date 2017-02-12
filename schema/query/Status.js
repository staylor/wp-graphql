import {
  GraphQLList,
  GraphQLString,
} from 'graphql';

import Status from 'type/Status';
import request, { statuses } from 'data';

export default {
  statuses: {
    type: new GraphQLList(Status),
    resolve: () => (
      request('/statuses').then(stati => (
        Object.keys(stati).map(status => ({
          ...stati[status],
          type: status,
        }))
      ))
    ),
  },
  status: {
    type: Status,
    args: {
      type: { type: GraphQLString },
    },
    // eslint-disable-next-line no-confusing-arrow
    resolve: (root, { type }) => (
      statuses.load(type).then(statusData => ({
        ...statusData,
        type,
      }))
    ),
  },
};
