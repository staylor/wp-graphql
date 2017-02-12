import {
  GraphQLList,
  GraphQLString,
} from 'graphql';

import USER_ORDERBY from 'enum/UserOrderby';

import User from 'type/User';
import { resolveWithArgs, itemResolver } from 'utils';
import { users } from 'data';
import { pagination, filter, slug } from 'query/args';

export default {
  users: {
    type: new GraphQLList(User),
    args: (
      Object.assign({}, pagination, filter, slug, {
        orderby: { type: USER_ORDERBY },
        roles: { type: GraphQLString },
      })
    ),
    resolve: resolveWithArgs('/users'),
  },
  user: itemResolver(User, users),
};
