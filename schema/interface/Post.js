import {
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
} from 'graphql';

/* eslint-disable camelcase */

import UserType from 'type/User';
import MediaType from 'type/Media';
import Meta from 'type/Meta';
import { slug, guid, link } from 'field/identifier';
import { date, date_gmt, modified, modified_gmt } from 'field/date';
import { comment_status, ping_status } from 'field/status';
import { title, content, excerpt } from 'field/content';
import { type, template } from 'field/post';

const PostInterface = new GraphQLInterfaceType({
  name: 'PostInterface',
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
    content,
    excerpt,
    comment_status,
    ping_status,
    template,
    meta: { type: new GraphQLList(Meta) },
    author: { type: UserType },
    featured_media: { type: MediaType },
  },
});

export default PostInterface;
