import PostQueries from 'query/Post';
import UserQueries from 'query/User';
import CategoryQueries from 'query/Category';
import TagQueries from 'query/Tag';
import PageQueries from 'query/Page';
import CommentQueries from 'query/Comment';
import TypeQueries from 'query/Type';
import TaxonomyQueries from 'query/Taxonomy';
import MediaQueries from 'query/Media';
import StatusQueries from 'query/Status';

export default (
  Object.assign(
    {},
    PostQueries,
    UserQueries,
    CategoryQueries,
    TagQueries,
    PageQueries,
    CommentQueries,
    TypeQueries,
    TaxonomyQueries,
    MediaQueries,
    StatusQueries,
  )
);
