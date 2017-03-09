import { graphql } from 'graphql';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/sidebars

test('GraphQL should return a collection of sidebars', async () => {
  const query = `
     query Q {
       sidebars {
         results {
           edges {
             node {
               id
               widgets {
                 classname
                 content {
                   rendered
                 }
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
  const { edges } = result.data.sidebars.results;

  edges.forEach(({ node }) => {
    expect(node.id).toBeDefined();
    expect(node.widgets.length).toBeGreaterThan(0);
  });
});
