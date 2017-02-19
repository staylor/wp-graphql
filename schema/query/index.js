import postQueries from 'query/Post';
import userQueries from 'query/User';
import categoryQueries from 'query/Category';
import tagQueries from 'query/Tag';
import pageQueries from 'query/Page';
import commentQueries from 'query/Comment';
import typeQueries from 'query/Type';
import taxonomyQueries from 'query/Taxonomy';
import mediaQueries from 'query/Media';
import statusQueries from 'query/Status';

export default {
  ...postQueries,
  ...userQueries,
  ...categoryQueries,
  ...tagQueries,
  ...pageQueries,
  ...commentQueries,
  ...typeQueries,
  ...taxonomyQueries,
  ...mediaQueries,
  ...statusQueries,
};
