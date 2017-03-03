import { graphql } from 'graphql';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/categories

test('GraphQL should return a collection of categories', async () => {
  const query = `
     query Q {
       categories {
         results {
           edges {
             node {
               name
               count
               description
               slug
               taxonomy {
                 slug
               }
               parent {
                 id
                 name
               }
               meta {
                 name
                 value
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
  const { edges } = result.data.categories.results;

  edges.forEach(({ node }) => {
    expect(node.count).toBeGreaterThan(0);
    expect(node.description).toBeDefined();
    expect(node.name).toBeDefined();
    expect(node.slug).toBeDefined();
    expect(node.taxonomy.slug).toBe('category');
    expect(node.parent).toBeNull();
    expect(node.meta).toBeNull();
  });
});
