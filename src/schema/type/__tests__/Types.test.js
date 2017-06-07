import { graphql } from 'graphql';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/types

test('GraphQL should return a collection of types', async () => {
  const query = `
     query Q {
       types {
         id
         name
         description
         hierarchical
         slug
         taxonomies
         rest_base
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const { data: { types } } = result;

  types.forEach(node => {
    expect(node.id).toBeDefined();
    expect(node.name).toBeDefined();
    expect(node.description).toBeDefined();
    expect(node.hierarchical).toBeDefined();
    expect(node.slug).toBeDefined();
    expect(node.taxonomies).toBeDefined();
    expect(node.rest_base).toBeDefined();
  });
});
