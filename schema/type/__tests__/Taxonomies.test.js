import { graphql } from 'graphql';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/taxonomies

test('GraphQL should return a collection of taxonomies', async () => {
  const query = `
     query Q {
       taxonomies {
         results {
           edges {
             node {
               id
               name
               description
               hierarchical
               slug
               types
               rest_base
             }
           }
         }
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const { edges } = result.data.taxonomies.results;

  edges.forEach(({ node }) => {
    expect(node.id).toBeDefined();
    expect(node.name).toBeDefined();
    expect(node.description).toBeDefined();
    expect(node.hierarchical).toBeDefined();
    expect(node.slug).toBeDefined();
    const expected = ['post'];
    expect(node.types).toEqual(expect.arrayContaining(expected));
    expect(node.rest_base).toBeDefined();
  });
});
