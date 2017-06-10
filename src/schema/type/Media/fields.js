import { GraphQLNonNull, GraphQLID } from 'graphql';
import { toGlobalId } from 'graphql-relay';
/* eslint-disable camelcase */
import { date, modified } from 'field/date';
import metaField from 'field/meta';
import { globalIdField, slug, guid, link } from 'field/identifier';
import { title } from 'field/content';
import { type, template } from 'field/post';
import { comment_status, ping_status } from 'field/status';
import { description, caption, alt_text, media_type, mime_type, source_url } from 'field/media';
import author from 'field/author';

export default {
  id: globalIdField(),
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
  ...author,
  meta: metaField(),
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
    resolve: data => toGlobalId('Post', data.post),
  },
};
