import {
  GraphQLInterfaceType,
  GraphQLList,
} from 'graphql';

/* eslint-disable camelcase */

import User from 'type/User';
import Media from 'type/Media';
import Meta from 'type/Meta';
import { id, slug, guid, link } from 'field/identifier';
import { date, date_gmt, modified, modified_gmt } from 'field/date';
import { comment_status, ping_status } from 'field/status';
import { title, content, excerpt } from 'field/content';
import { type, template } from 'field/post';

const PostInterface = new GraphQLInterfaceType({
  name: 'PostInterface',
  fields: {
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
    content,
    excerpt,
    comment_status,
    ping_status,
    template,
    meta: { type: new GraphQLList(Meta) },
    author: { type: User },
    featured_media: { type: Media },
  },
});

export default PostInterface;
