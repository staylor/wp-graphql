import { GraphQLString } from 'graphql';

import USER_ORDERBY from 'enum/UserOrderby';

import UserCollectionType from 'type/User/Collection';
import UserType from 'type/User';
import User from 'data/User';
import { itemResolver } from 'utils';
import { pagination, filter, slug } from 'query/args';

export default {
  users: {
    type: UserCollectionType,
    args: (
      Object.assign({}, pagination, filter, slug, {
        orderby: { type: USER_ORDERBY },
        roles: {
          type: GraphQLString,
          description: 'Limit result set to users matching at least one specific role provided. Accepts csv list or single role (value or comma-separated values).',
        },
      })
    ),
    resolve: (root, args) => ({ args }),
  },
  user: itemResolver(UserType, User),
};
