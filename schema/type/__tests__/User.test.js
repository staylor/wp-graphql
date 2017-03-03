import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/types/post

it('GraphQL should return a known User', async () => {
  const globalId = toGlobalId('User', 1);
  const query = `
     query Q {
       user(id: "${globalId}") {
         id
         name
         description
         link
         slug
         avatar_urls {
           size
           url
         }
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const { data: { user: {
    id,
    name,
    description,
    link,
    slug,
    avatar_urls,
  } } } = result;

  expect(id).toBe(globalId);
  expect(name).toBe('Scott Taylor');
  expect(description).toBeDefined();
  expect(link).toBeDefined();
  expect(slug).toBe('admin');
  expect(avatar_urls.length).toBeGreaterThan(0);
});
