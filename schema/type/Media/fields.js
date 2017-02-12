import {
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import Title from 'type/Title';
import Description from 'type/Description';
import Caption from 'type/Caption';
import User from 'type/User';
import MediaLinks from 'type/Media/Links';
// eslint-disable-next-line camelcase
import { date, date_gmt, modified, modified_gmt } from 'field/date';
import metaField from 'field/meta';
import { id, slug, guid } from 'field/identifier';
// eslint-disable-next-line camelcase
import { comment_status, ping_status } from 'field/status';
import { users } from 'data';

export default {
  id,
  date,
  date_gmt,
  guid,
  modified,
  modified_gmt,
  slug,
  type: { type: GraphQLString },
  link: { type: GraphQLString },
  title: { type: Title },
  // content (description instead)
  // excerpt (caption instead)
  comment_status,
  ping_status,
  template: { type: GraphQLString },
  meta: metaField(),
  author: {
    type: User,
    resolve: post => (
      post.author > 0 ? users.load(post.author) : null
    ),
  },
  _links: { type: MediaLinks },
  // featured_media (this field should exist for audio/video)
  // extra media fields
  description: { type: Description },
  caption: { type: Caption },
  alt_text: { type: GraphQLString },
  media_type: { type: GraphQLString },
  mime_type: { type: GraphQLString },
  post: { type: GraphQLInt },
  source_url: { type: GraphQLString },
};
