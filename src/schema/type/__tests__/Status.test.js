import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/statuses/publish

it('GraphQL should return a known Status', async () => {
  const globalId = toGlobalId('Status', 'publish');
  const query = `
     query Q {
       status(id: "${globalId}") {
         id
         name
         public
         queryable
         slug
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const { data: { status: { id, name, public: publicVar, queryable, slug } } } = result;

  expect(id).toBe(globalId);
  expect(name).toBe('Published');
  expect(publicVar).toBe(true);
  expect(slug).toBe('publish');
  expect(queryable).toBe(true);
});
