import {
  GraphQLList,
  GraphQLString,
} from 'graphql';

import POST_ORDERBY from 'enum/PostOrderby';
import MEDIA_TYPE from 'enum/MediaType';

import Media from 'type/Media';
import { resolveWithArgs, itemResolver } from 'utils';
import { media } from 'data';
import { pagination, filter, date, hierarchical, author, slug } from 'query/args';

export default {
  media: {
    type: new GraphQLList(Media),
    args: (
      Object.assign({}, pagination, filter, date, hierarchical, author, slug, {
        orderby: { type: POST_ORDERBY },
        media_type: {
          type: MEDIA_TYPE,
          description: 'Limit result set to attachments of a particular media type.',
        },
        mime_type: {
          type: GraphQLString,
          description: 'Limit result set to attachments of a particular MIME type.',
        },
      })
    ),
    resolve: resolveWithArgs('/media'),
  },
  medium: itemResolver(Media, media),
};
