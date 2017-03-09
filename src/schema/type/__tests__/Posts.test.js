import { graphql } from 'graphql';
import schema from 'schema';
import { dateRegex } from 'jest/utils';

// https://highforthis.com/wp-json/wp/v2/posts

test('GraphQL should return a collection of posts', async () => {
  const query = `
     query Q {
       posts {
         results {
           edges {
             node {
               id
               slug
               date
               title {
                 rendered
               }
               content {
                 rendered
               }
               tags {
                 id
                 name
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
  const { edges } = result.data.posts.results;

  edges.forEach(({ node }) => {
    expect(node.id).toBeDefined();
    expect(node.date).toMatch(dateRegex);
    expect(node.title).toBeDefined();
    expect(node.slug).toBeDefined();
    expect(node.content).toBeDefined();
    expect(node.tags).toBeDefined();
  });
});
