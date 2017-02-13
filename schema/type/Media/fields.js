/* eslint-disable camelcase */

import Description from 'type/Description';
import Caption from 'type/Caption';
import MediaLinks from 'type/Media/Links';

import { date, date_gmt, modified, modified_gmt } from 'field/date';
import metaField from 'field/meta';
import { id, slug, guid, link } from 'field/identifier';
import { title } from 'field/content';
import { type, template } from 'field/post';
import { comment_status, ping_status } from 'field/status';
import { alt_text, media_type, mime_type, source_url, post } from 'field/media';
import author from 'field/author';

export default {
  id,
  date,
  date_gmt,
  guid,
  modified,
  modified_gmt,
  slug,
  type,
  link,
  title,
  // content (description instead)
  // excerpt (caption instead)
  comment_status,
  ping_status,
  template,
  meta: metaField(),
  author,
  _links: { type: MediaLinks },
  // featured_media (this field should exist for audio/video)
  // extra media fields
  description: { type: Description },
  caption: { type: Caption },
  alt_text,
  media_type,
  mime_type,
  post,
  source_url,
};
