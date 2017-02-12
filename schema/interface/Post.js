import {
  GraphQLInterfaceType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Guid from 'type/Guid';
import Title from 'type/Title';
import Content from 'type/Content';
import Excerpt from 'type/Excerpt';
import User from 'type/User';
import Media from 'type/Media';
import Meta from 'type/Meta';

import COMMENT_STATUS from 'enum/CommentStatus';
import PING_STATUS from 'enum/PingStatus';

const PostInterface = new GraphQLInterfaceType({
  name: 'PostInterface',
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
    content: { type: Content },
    excerpt: { type: Excerpt },
    comment_status: { type: COMMENT_STATUS },
    ping_status: { type: PING_STATUS },
    template: { type: GraphQLString },
    meta: { type: new GraphQLList(Meta) },
    author: { type: User },
    featured_media: { type: Media },
  },
});

export default PostInterface;
