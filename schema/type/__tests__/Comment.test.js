import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/comments/17

it('GraphQL should return a known comment', async () => {
  const globalId = toGlobalId('Comment', 17);
  const parentId = toGlobalId('Comment', 16);
  const query = `
     query Q {
       comment(id: "${globalId}") {
         id
         author_name
         author_url
         date
         content {
           rendered
         }
         author_avatar_urls {
           size
           url
         }
         parent
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const { data: { comment: {
    id,
    author_name,
    author_url,
    date,
    content: { rendered: content },
    author_avatar_urls,
    parent,
  } } } = result;

  expect(id).toBe(globalId);
  expect(author_name).toBe('Scott Taylor');
  expect(author_url).toBeDefined();
  expect(date).toBe('2017-02-21T17:40:19');
  expect(content).toBeDefined();
  expect(author_avatar_urls).toBeDefined();
  expect(parent).toBe(parentId);
});
