import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import Guid from 'type/Guid';
import Title from 'type/Title';
import Meta from 'type/Meta';
import Description from 'type/Description';
import Caption from 'type/Caption';
import User from 'type/User';
import MediaDetails from 'type/Media/Details';
import MediaLinks from 'type/Media/Links';

import COMMENT_STATUS from 'enum/CommentStatus';
import PING_STATUS from 'enum/PingStatus';

import { users } from 'data';
import { metaResolver } from 'utils';

const Media = new GraphQLObjectType({
  name: 'Media',
  description: 'An object.',
  fields: {
    id: { type: GraphQLInt },
    date: { type: GraphQLString },
    date_gmt: { type: GraphQLString },
    guid: { type: Guid },
    modified: { type: GraphQLString },
    modified_gmt: { type: GraphQLString },
    slug: { type: GraphQLString },
    type: { type: GraphQLString },
    link: { type: GraphQLString },
    title: { type: Title },
    // content (description instead)
    // excerpt (caption instead)
    comment_status: { type: COMMENT_STATUS },
    ping_status: { type: PING_STATUS },
    template: { type: GraphQLString },
    meta: {
      type: new GraphQLList(Meta),
      resolve: metaResolver,
    },
    author: {
      type: User,
      resolve: post => (
        post.author > 0 ? users.load(post.author) : null
      ),
    },
    _links: { type: MediaLinks },
    // featured_media (this field should exist for audio/video)
    // extra media fields
    sticky: { type: GraphQLBoolean },
    description: { type: Description },
    caption: { type: Caption },
    alt_text: { type: GraphQLString },
    media_type: { type: GraphQLString },
    mime_type: { type: GraphQLString },
    media_details: { type: MediaDetails },
    post: { type: GraphQLInt },
    source_url: { type: GraphQLString },
  },
});

export default Media;
