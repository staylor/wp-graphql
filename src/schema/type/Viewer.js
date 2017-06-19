import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField, fromGlobalId } from 'graphql-relay';
import PostType from 'type/Post';
import Post from 'data/Post';
import PageType from 'type/Page';
import Page from 'data/Page';
import MediaType from 'type/Media';
import Media from 'data/Media';
import CategoryType from 'type/Category';
import Category from 'data/Category';
import TagType from 'type/Tag';
import Tag from 'data/Tag';
import NavMenuType from 'type/NavMenu';
import NavMenu from 'data/NavMenu';
import SidebarType from 'type/Sidebar';
import Sidebar from 'data/Sidebar';
import UserType from 'type/User';
import User from 'data/User';
import postConnection from 'connection/Post';
import SettingsType from 'type/Settings';
import Settings from 'data/Settings';
import ChartType from 'type/Chart';
import Chart from 'data/Chart';
import TermInterface from 'interface/Term';
import { id, slug } from 'field/identifier';

const itemResolver = (dataType, loader) => ({
  type: dataType,
  args: {
    ...id,
    ...slug,
  },
  resolve: (root, { id: globalId, slug: slugParam }) => {
    if (slugParam && loader.loadBySlug) {
      return loader.loadBySlug(slugParam);
    }
    return loader.load(fromGlobalId(globalId).id);
  },
});

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField(),
    post: itemResolver(PostType, Post),
    page: itemResolver(PageType, Page),
    media: itemResolver(MediaType, Media),
    category: itemResolver(CategoryType, Category),
    tag: itemResolver(TagType, Tag),
    term: {
      type: TermInterface,
      args: {
        slug: {
          ...slug,
          type: new GraphQLNonNull(GraphQLString),
        },
        taxonomy: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (root, { slug: slugParam, taxonomy }) => {
        switch (taxonomy) {
          case 'category':
            return Category.loadBySlug(slugParam);
          case 'tag':
            return Tag.loadBySlug(slugParam);
          default:
            return null;
        }
      },
    },
    author: itemResolver(UserType, User),
    navMenu: itemResolver(NavMenuType, NavMenu),
    sidebar: itemResolver(SidebarType, Sidebar),
    posts: postConnection,
    settings: {
      type: SettingsType,
      resolve: () => Settings.load(),
    },
    chart: {
      type: ChartType,
      resolve: () => Chart.load(),
    },
  }),
});

export default ViewerType;
