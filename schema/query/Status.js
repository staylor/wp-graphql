import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import StatusType from 'type/Status';
import Status from 'data/Status';
import request from 'data';

export default {
  statuses: {
    type: new GraphQLList(StatusType),
    resolve: () => (
      request(Status.getEndpoint()).then(stati => (
        Object.keys(stati).map(status => (Object.assign(new Status(), {
          ...stati[status],
          id: status,
        })))
      ))
    ),
  },
  status: {
    type: StatusType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'Unique identifier for the object.',
      },
    },
    // eslint-disable-next-line no-confusing-arrow
    resolve: (root, { id }) => (
      Status.load(id).then(statusData => (Object.assign(new Status(), {
        ...statusData,
        id,
      })))
    ),
  },
};
