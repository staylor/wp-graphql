import { GraphQLList } from 'graphql';

import StatusType from 'type/Status';
import Status from 'data/Status';
import { itemResolver } from 'utils';

export default {
  statuses: {
    description: 'List of statuses.',
    type: new GraphQLList(StatusType),
    resolve: () => Status.collection(),
  },
  status: itemResolver(StatusType, Status),
};
