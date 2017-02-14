import {
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
} from 'graphql';

import Description from 'type/Description';
import Caption from 'type/Caption';
import UserType from 'type/User';
import Meta from 'type/Meta';
import MediaLinks from 'type/Media/Links';

/* eslint-disable camelcase */
import { id, slug, guid, link } from 'field/identifier';
import { date, date_gmt, modified, modified_gmt } from 'field/date';
import { comment_status, ping_status } from 'field/status';
import { title } from 'field/content';
import { type, template } from 'field/post';
import { alt_text, media_type, mime_type, source_url } from 'field/media';
/* eslint-enable camelcase */

const MediaInterface = new GraphQLInterfaceType({
  name: 'MediaInterface',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier for the object.',
    },
    date,
    date_gmt,
    guid,
    modified,
    modified_gmt,
    slug,
    type,
    link,
    title,
    comment_status,
    ping_status,
    template,
    meta: { type: new GraphQLList(Meta) },
    author: { type: UserType },
    _links: { type: MediaLinks },
    // featured_media (this field should exist for audio/video)
    // extra media fields
    description: { type: Description },
    caption: { type: Caption },
    alt_text,
    media_type,
    mime_type,
    post: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The ID for the associated post of the attachment.',
    },
    source_url,
  },
});

export default MediaInterface;
