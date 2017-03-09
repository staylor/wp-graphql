import { graphql } from 'graphql';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/pages

test('GraphQL should return a collection of nav menus', async () => {
  const query = `
     query Q {
       navMenus {
         results {
           edges {
             node {
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
         }
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const { edges } = result.data.navMenus.results;

  edges.forEach(({ node }) => {
    expect(node.id).toBeDefined();
    expect(node.name).toBeDefined();
    expect(node.items.length).toBeGreaterThan(0);
  });
});
