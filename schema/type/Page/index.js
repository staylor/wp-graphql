import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import PostInterface from 'interface/Post';
import Guid from 'type/Guid';
import Title from 'type/Title';
import Content from 'type/Content';
import Excerpt from 'type/Excerpt';
import Meta from 'type/Meta';
import User from 'type/User';
import Media from 'type/Media';
import PageLinks from 'type/Page/Links';

import { pages, users, media } from 'data';
import { metaResolver } from 'utils';

import COMMENT_STATUS from 'enum/CommentStatus';
import PING_STATUS from 'enum/PingStatus';

const Page = new GraphQLObjectType({
  name: 'Page',
  description: 'An object.',
  interfaces: [PostInterface],
  isTypeOf(page) {
    return page.type === 'page';
  },
  fields: () => ({
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
    meta: {
      type: new GraphQLList(Meta),
      resolve: metaResolver,
    },
    author: {
      type: User,
      resolve: page => (
        page.author > 0 ? users.load(page.author) : null
      ),
    },
    featured_media: {
      type: Media,
      resolve: page => (
        page.featured_media ? media.load(page.featured_media) : null
      ),
    },
    _links: { type: PageLinks },
    // extra page fields
    parent: {
      type: Page,
      resolve: page => (page.parent ? pages.load(page.parent) : null),
    },
    menu_order: { type: GraphQLInt },
  }),
});

export default Page;
