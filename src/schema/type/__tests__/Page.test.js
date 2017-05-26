import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/pages/215

it('GraphQL should return a known Page', async () => {
  const globalId = toGlobalId('Page', 215);
  const query = `
     query Q {
       page(id: "${globalId}") {
         id
         slug
         title {
           rendered
         }
         content {
           rendered
         }
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const {
    data: { page: { id, slug, title: { rendered: title }, content: { rendered: content } } },
  } = result;

  expect(id).toBe(globalId);
  expect(title).toBe('Go To This');
  expect(slug).toBe('go-to-this');
  expect(content).toBeDefined();
});
