import { graphql } from 'graphql';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/pages

test('GraphQL should return a collection of pages', async () => {
  const query = `
     query Q {
       pages {
         results {
           edges {
             node {
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
         }
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const { edges } = result.data.pages.results;

  edges.forEach(({ node }) => {
    expect(node.id).toBeDefined();
    expect(node.title).toBeDefined();
    expect(node.slug).toBeDefined();
    expect(node.content).toBeDefined();
  });
});
