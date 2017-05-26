import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import schema from 'schema';

// https://highforthis.com/wp-json/graphql/v1/nav-menus/2

it('GraphQL should return a known NavMenu', async () => {
  const globalId = toGlobalId('NavMenu', 2);
  const query = `
     query Q {
       navMenu(id: "${globalId}") {
         id
         name
         items {
           id
           title
           url
           parent
           order
           object
           object_id
         }
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const { data: { navMenu: { id, name, items } } } = result;

  expect(id).toBe(globalId);
  expect(name).toBe('Main Nav');
  expect(items.length).toBeGreaterThan(0);
});
