import {
  GraphQLInterfaceType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Guid from 'type/Guid';
import Title from 'type/Title';
import Description from 'type/Description';
import Caption from 'type/Caption';
import User from 'type/User';
import MediaLinks from 'type/Media/Links';
import Meta from 'type/Meta';

import COMMENT_STATUS from 'enum/CommentStatus';
import PING_STATUS from 'enum/PingStatus';

const MediaInterface = new GraphQLInterfaceType({
  name: 'MediaInterface',
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
    comment_status: { type: COMMENT_STATUS },
    ping_status: { type: PING_STATUS },
    template: { type: GraphQLString },
    meta: { type: new GraphQLList(Meta) },
    author: { type: User },
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
  },
});

export default MediaInterface;
