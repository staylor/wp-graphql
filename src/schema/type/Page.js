import { GraphQLObjectType, GraphQLInt } from 'graphql';
import PostInterface from 'interface/Post';
import { globalIdField, slug, guid, link } from 'field/identifier';
import { title, content, excerpt } from 'field/content';
import { date, modified } from 'field/date';
import metaField from 'field/meta';
import { type, template } from 'field/post';
import { commentStatus, pingStatus } from 'field/status';
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
    ...date,
    ...guid,
    ...modified,
    ...slug,
    ...type,
    ...link,
    ...title,
    ...content,
    ...excerpt,
    ...commentStatus,
    ...pingStatus,
    ...template,
    ...author,
    featuredMedia: featuredMedia(),
    meta: metaField(),
    // extra page fields
    parent: {
      type: PageType,
      description: 'The ID for the parent of the object.',
      resolve: page => (page.parent > 0 ? Page.load(page.parent) : null),
    },
    menu_order: {
      type: GraphQLInt,
      description: 'The order of the object in relation to other object of its type.',
    },
  }),
});

export default PageType;
