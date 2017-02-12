import {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import User from 'type/User';

import ORDER from 'enum/Order';
import USER_ORDERBY from 'enum/UserOrderby';

import { resolveWithArgs, itemResolver } from 'utils';
import { users } from 'data';

export default {
  users: {
    type: new GraphQLList(User),
    args: {
      page: { type: GraphQLInt },
      per_page: { type: GraphQLInt },
      offset: { type: GraphQLInt },
      search: { type: GraphQLString },
      order: { type: ORDER },
      orderby: { type: USER_ORDERBY },
      include: { type: GraphQLString },
      exclude: { type: GraphQLString },
      slug: { type: GraphQLString },
      roles: { type: GraphQLString },
    },
    resolve: resolveWithArgs('/users'),
  },
  user: itemResolver(User, users),
};
