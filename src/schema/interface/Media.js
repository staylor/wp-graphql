import { GraphQLInterfaceType, GraphQLNonNull, GraphQLID, GraphQLList } from 'graphql';

/* eslint-disable camelcase */

import UserType from 'type/User';
import Meta from 'type/Meta';
import MediaLinks from 'type/Media/Links';

import { slug, guid, link } from 'field/identifier';
import { date, modified } from 'field/date';
import { comment_status, ping_status } from 'field/status';
import { title } from 'field/content';
import { type, template } from 'field/post';
import { description, caption, alt_text, media_type, mime_type, source_url } from 'field/media';

const MediaInterface = new GraphQLInterfaceType({
  name: 'MediaInterface',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier for the object.',
    },
    ...date,
    ...guid,
    ...modified,
    ...slug,
    ...type,
    ...link,
    ...title,
    ...comment_status,
    ...ping_status,
    ...template,
    meta: { type: new GraphQLList(Meta) },
    author: { type: UserType },
    _links: { type: MediaLinks },
    // featured_media (this field should exist for audio/video)
    // extra media fields
    ...description,
    ...caption,
    ...alt_text,
    ...media_type,
    ...mime_type,
    ...source_url,
    post: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The ID for the associated post of the attachment.',
    },
  },
});

export default MediaInterface;
