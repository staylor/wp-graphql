import {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import Media from 'type/Media';

import ORDER from 'enum/Order';
import POST_ORDERBY from 'enum/PostOrderby';
import MEDIA_TYPE from 'enum/MediaType';

import { resolveWithArgs, itemResolver } from 'utils';
import { media } from 'data';

export default {
  media: {
    type: new GraphQLList(Media),
    args: {
      page: { type: GraphQLInt },
      per_page: { type: GraphQLInt },
      offset: { type: GraphQLInt },
      search: { type: GraphQLString },
      order: { type: ORDER },
      orderby: { type: POST_ORDERBY },
      media_type: { type: MEDIA_TYPE },
      mime_type: { type: GraphQLString },
      // must be in format: 2017-02-11T00:00:00
      after: { type: GraphQLString },
      before: { type: GraphQLString },
      // value or comma-separated values
      author: { type: GraphQLString },
      author_exclude: { type: GraphQLString },
      parent: { type: GraphQLString },
      parent_exclude: { type: GraphQLString },
      include: { type: GraphQLString },
      exclude: { type: GraphQLString },
      slug: { type: GraphQLString },
    },
    resolve: resolveWithArgs('/media'),
  },
  medium: itemResolver(Media, media),
};
