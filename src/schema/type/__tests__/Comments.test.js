import { graphql } from 'graphql';
import schema from 'schema';
import { dateRegex } from 'jest/utils';

// https://highforthis.com/wp-json/wp/v2/comments

test('GraphQL should return a collection of comments', async () => {
  const query = `
     query Q {
       comments {
         results {
           edges {
             node {
               id
               author_name
               author_url
               date
               content {
                 rendered
               }
               author_avatar_urls {
                 size
                 url
               }
               parent
             }
           }
         }
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const { edges } = result.data.comments.results;

  edges.forEach(({ node }) => {
    expect(node.id).toBeDefined();
    expect(node.author_name).toBeDefined();
    expect(node.author_url).toBeDefined();
    expect(node.date).toMatch(dateRegex);
    expect(node.content).toBeDefined();
    expect(node.author_avatar_urls).toBeDefined();
    expect(node.parent).toBeDefined();
  });
});
