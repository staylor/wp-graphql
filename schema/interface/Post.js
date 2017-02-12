import {
  GraphQLInterfaceType,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Title from 'type/Title';
import Content from 'type/Content';
import Excerpt from 'type/Excerpt';
import User from 'type/User';
import Media from 'type/Media';
import Meta from 'type/Meta';
import { id, slug, guid } from 'field/identifier';
// eslint-disable-next-line camelcase
import { date, date_gmt, modified, modified_gmt } from 'field/date';
// eslint-disable-next-line camelcase
import { comment_status, ping_status } from 'field/status';

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
    type: { type: GraphQLString },
    link: { type: GraphQLString },
    title: { type: Title },
    content: { type: Content },
    excerpt: { type: Excerpt },
    comment_status,
    ping_status,
    template: { type: GraphQLString },
    meta: { type: new GraphQLList(Meta) },
    author: { type: User },
    featured_media: { type: Media },
  },
});

export default PostInterface;
