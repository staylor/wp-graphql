import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import Guid from './Guid';
import Title from './Title';
import Content from './Content';
import Excerpt from './Excerpt';
import Meta from './Meta';
import User from './User';
import PageLinks from './PageLinks';

import {
  pages,
  users,
} from '../../data';
import { metaResolver } from '../utils';

const Page = new GraphQLObjectType({
  name: 'Page',
  description: 'An object.',
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
    author: {
      type: User,
      resolve: post => users.load(post.author),
    },
    featured_media: { type: GraphQLInt },
    parent: {
      type: Page,
      resolve: page => (page.parent ? pages.load(page.parent) : null),
    },
    menu_order: { type: GraphQLInt },
    comment_status: { type: GraphQLString },
    ping_status: { type: GraphQLString },
    template: { type: GraphQLString },
    meta: {
      type: new GraphQLList(Meta),
      resolve: metaResolver,
    },
    _links: { type: PageLinks },
  }),
});

export default Page;
