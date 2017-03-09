import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import schema from 'schema';

// https://highforthis.com/wp-json/graphql/v1/sidebars/sidebar-1

it('GraphQL should return a known Sidebar', async () => {
  const globalId = toGlobalId('Sidebar', 'sidebar-1');
  const query = `
     query Q {
       sidebar(id: "${globalId}") {
         id
         widgets {
           classname
           content {
             rendered
           }
         }
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const { data: { sidebar: {
    id,
    widgets,
  } } } = result;

  expect(id).toBe(globalId);
  expect(widgets.length).toBeGreaterThan(0);
});
