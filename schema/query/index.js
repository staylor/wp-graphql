import postQueries from 'query/Post';
import userQueries from 'query/User';
import categoryQueries from 'query/Category';
import tagQueries from 'query/Tag';
import pageQueries from 'query/Page';
import commentQueries from 'query/Comment';
import typeQueries from 'query/Type';
import taxonomyQueries from 'query/Taxonomy';
import mediaQueries from 'query/Media';
import sidebarQueries from 'query/Sidebar';
import statusQueries from 'query/Status';
import { nodeField } from 'type/relayNode';

export default {
  node: nodeField,
  ...postQueries,
  ...userQueries,
  ...categoryQueries,
  ...tagQueries,
  ...pageQueries,
  ...commentQueries,
  ...typeQueries,
  ...taxonomyQueries,
  ...mediaQueries,
  ...sidebarQueries,
  ...statusQueries,
};
