import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import Guid from './Guid';
import Title from './Title';
import Meta from './Meta';
import Description from './Description';
import Caption from './Caption';
import User from './User';
import MediaDetails from './MediaDetails';
import MediaLinks from './MediaLinks';

import {
  users,
} from '../../data';
import { metaResolver } from '../utils';

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
    author: {
      type: User,
      resolve: post => users.load(post.author),
    },
    comment_status: { type: GraphQLString },
    ping_status: { type: GraphQLString },
    sticky: { type: GraphQLBoolean },
    template: { type: GraphQLString },
    meta: {
      type: new GraphQLList(Meta),
      resolve: metaResolver,
    },
    description: { type: Description },
    caption: { type: Caption },
    alt_text: { type: GraphQLString },
    media_type: { type: GraphQLString },
    mime_type: { type: GraphQLString },
    media_details: { type: MediaDetails },
    post: { type: GraphQLInt },
    source_url: { type: GraphQLString },
    _links: { type: MediaLinks },
  },
});

export default Media;
