import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import schema from 'schema';
import { dateRegex } from 'jest/utils';

// https://highforthis.com/wp-json/wp/v2/posts/2696

it('GraphQL should return a known Post', async () => {
  const globalId = toGlobalId('Post', 2696);
  const query = `
     query Q {
       post(id: "${globalId}") {
         id
         slug
         date
         title {
           rendered
         }
         content {
           rendered
         }
         tags {
           id
           name
         }
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const {
    data: {
      post: { id, slug, date, title: { rendered: title }, content: { rendered: content }, tags },
    },
  } = result;

  expect(id).toBe(globalId);
  expect(date).toMatch(dateRegex);
  expect(title).toBeDefined();
  expect(slug).toBe('dirty-projectors-little-bubble');
  expect(content).toBeDefined();
  expect(tags).toBeDefined();
});
