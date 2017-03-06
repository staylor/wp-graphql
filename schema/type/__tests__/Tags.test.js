import { graphql } from 'graphql';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/tags

test('GraphQL should return a collection of tags', async () => {
  const query = `
     query Q {
       tags {
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
  const { edges } = result.data.tags.results;

  edges.forEach(({ node }) => {
    expect(node.count).toBeGreaterThan(0);
    expect(node.description).toBeDefined();
    expect(node.name).toBeDefined();
    expect(node.slug).toBeDefined();
    expect(node.taxonomy.slug).toBe('post_tag');
    expect(node.meta).toBeNull();
  });
});
