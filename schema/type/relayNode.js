import {
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay';

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

import Category from 'data/Category';
import Comment from 'data/Comment';
import Media from 'data/Media';
import Page from 'data/Page';
import Post from 'data/Post';
import Status from 'data/Status';
import Tag from 'data/Tag';
import Taxonomy from 'data/Taxonomy';
import Type from 'data/Type';
import User from 'data/User';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type } = fromGlobalId(globalId);

    switch (type) {
      case 'Category':
        return Category.load(globalId);
      case 'Comment':
        return Comment.load(globalId);
      case 'Media':
        return Media.load(globalId);
      case 'Page':
        return Page.load(globalId);
      case 'Post':
        return Post.load(globalId);
      case 'Status':
        return Status.load(globalId);
      case 'Tag':
        return Tag.load(globalId);
      case 'Taxonomy':
        return Taxonomy.load(globalId);
      case 'Type':
        return Type.load(globalId);
      case 'User':
        return User.load(globalId);
      default:
        return null;
    }
  },
  (obj) => {
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
      case obj instanceof StatusType:
        return Status;
      case obj instanceof TagType:
        return Tag;
      case obj instanceof TaxonomyType:
        return Taxonomy;
      case obj instanceof TypeType:
        return Type;
      case obj instanceof UserType:
        return User;
      default:
        return null;
    }
  },
);

export { nodeInterface, nodeField };
