import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import CategoryType from 'type/Category';
import CommentType from 'type/Comment';
import MediaType from 'type/Media';
import PageType from 'type/Page';
import PostType from 'type/Post';
import StatusType from 'type/Status';
import TagType from 'type/Tag';
import TaxonomyType from 'type/Taxonomy';
import TypeType from 'type/Type';
import UserType from 'type/User';
import SidebarType from 'type/Sidebar';

import Category from 'data/Category';
import Comment from 'data/Comment';
import Media from 'data/Media';
import Page from 'data/Page';
import Post from 'data/Post';
import Tag from 'data/Tag';
import Taxonomy from 'data/Taxonomy';
import User from 'data/User';
import Sidebar from 'data/Sidebar';

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { id, type } = fromGlobalId(globalId);

    switch (type) {
      case 'Category':
        return Category.load(id);
      case 'Comment':
        return Comment.load(id);
      case 'Media':
        return Media.load(id);
      case 'Page':
        return Page.load(id);
      case 'Post':
        return Post.load(id);
      case 'Tag':
        return Tag.load(id);
      case 'Taxonomy':
        return Taxonomy.load(id);
      case 'User':
        return User.load(id);
      case 'Sidebar':
        return Sidebar.load(id);
      case 'Viewer':
        return { id: 'me' };
      default:
        return null;
    }
  },
  obj => {
    switch (true) {
      case obj instanceof CategoryType:
        return Category;
      case obj instanceof CommentType:
        return Comment;
      case obj instanceof MediaType:
        return Media;
      case obj instanceof PageType:
        return Page;
      case obj instanceof PostType:
        return Post;
      case obj instanceof TagType:
        return Tag;
      case obj instanceof TaxonomyType:
        return Taxonomy;
      case obj instanceof UserType:
        return User;
      case obj instanceof SidebarType:
        return Sidebar;
      default:
        return null;
    }
  }
);

export { nodeInterface, nodeField };
