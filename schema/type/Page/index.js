import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import PostInterface from 'interface/Post';
import Title from 'type/Title';
import Content from 'type/Content';
import Excerpt from 'type/Excerpt';
import User from 'type/User';
import Media from 'type/Media';
import PageLinks from 'type/Page/Links';
import { id, slug, guid } from 'field/identifier';
// eslint-disable-next-line camelcase
import { date, date_gmt, modified, modified_gmt } from 'field/date';
import metaField from 'field/meta';
// eslint-disable-next-line camelcase
import { comment_status, ping_status } from 'field/status';
import { pages, users, media } from 'data';

const Page = new GraphQLObjectType({
  name: 'Page',
  description: 'An object.',
  interfaces: [PostInterface],
  isTypeOf(page) {
    return page.type === 'page';
  },
  fields: () => ({
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
    meta: metaField(),
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
