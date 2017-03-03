import { graphql } from 'graphql';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/users

test('GraphQL should return a collection of users', async () => {
  const query = `
     query Q {
       users {
         results {
           edges {
             node {
               id
               name
               description
               link
               slug
               avatar_urls {
                 size
                 url
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
  const { edges } = result.data.users.results;

  edges.forEach(({ node }) => {
    expect(node.id).toBeDefined();
    expect(node.name).toBeDefined();
    expect(node.description).toBeDefined();
    expect(node.link).toBeDefined();
    expect(node.slug).toBeDefined();
    expect(node.avatar_urls.length).toBeGreaterThan(0);
  });
});
