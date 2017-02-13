import {
  GraphQLObjectType,
  GraphQLInt,
} from 'graphql';

/* eslint-disable camelcase */

import PostInterface from 'interface/Post';
import PageLinks from 'type/Page/Links';

import { id, slug, guid, link } from 'field/identifier';
import { title, content, excerpt } from 'field/content';
import { date, date_gmt, modified, modified_gmt } from 'field/date';
import metaField from 'field/meta';
import { type, template } from 'field/post';
import { comment_status, ping_status } from 'field/status';
import { featuredMedia } from 'field/media';
import author from 'field/author';

import { pages } from 'data';

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
    type,
    link,
    title,
    content,
    excerpt,
    comment_status,
    ping_status,
    template,
    meta: metaField(),
    author,
    featured_media: featuredMedia(),
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
