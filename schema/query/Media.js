import { GraphQLString } from 'graphql';

import POST_ORDERBY from 'enum/PostOrderby';
import MEDIA_TYPE from 'enum/MediaType';

import MediaCollectionType from 'type/Media/Collection';
import MediaType from 'type/Media';
import Media from 'data/Media';
import { itemResolver } from 'utils';
import { pagination, filter, date, hierarchical, author, slug } from 'query/args';

export default {
  media: {
    type: MediaCollectionType,
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
    resolve: () => ({ results: [] }),
  },
  medium: itemResolver(MediaType, Media),
};
