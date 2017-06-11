import { GraphQLObjectType } from 'graphql';
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
    author: itemResolver(UserType, User),
    navMenu: itemResolver(NavMenuType, NavMenu),
    sidebar: itemResolver(SidebarType, Sidebar),
    posts: postConnection,
  }),
});

export default ViewerType;
