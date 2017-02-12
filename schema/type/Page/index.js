import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import Guid from 'type/Guid';
import Title from 'type/Title';
import Content from 'type/Content';
import Excerpt from 'type/Excerpt';
import Meta from 'type/Meta';
import User from 'type/User';
import PageLinks from 'type/Page/Links';

import { pages, users } from 'data';
import { metaResolver } from 'utils';

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
