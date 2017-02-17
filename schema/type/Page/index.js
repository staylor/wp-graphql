import {
  GraphQLObjectType,
  GraphQLInt,
} from 'graphql';
import { toGlobalId } from 'graphql-relay';

/* eslint-disable camelcase */

import PostInterface from 'interface/Post';
import PageLinks from 'type/Page/Links';

import { globalIdField, slug, guid, link } from 'field/identifier';
import { title, content, excerpt } from 'field/content';
import { date, date_gmt, modified, modified_gmt } from 'field/date';
import metaField from 'field/meta';
import { type, template } from 'field/post';
import { comment_status, ping_status } from 'field/status';
import { featuredMedia } from 'field/media';
import author from 'field/author';
import Page from 'data/Page';

const PageType = new GraphQLObjectType({
  name: 'Page',
  description: 'An object.',
  interfaces: [PostInterface],
  isTypeOf(page) {
    return page.type === 'page';
  },
  fields: () => ({
    id: globalIdField(),
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
      type: PageType,
      resolve: page => (page.parent ? Page.load(toGlobalId('Page', page.parent)) : null),
    },
    menu_order: { type: GraphQLInt },
  }),
});

export default PageType;
