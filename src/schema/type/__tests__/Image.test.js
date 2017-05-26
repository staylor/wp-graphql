import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/media/2724

it('GraphQL should return a known attachment', async () => {
  const globalId = toGlobalId('Media', 2724);
  const postId = toGlobalId('Post', 2723);
  const query = `
     query Q {
       medium(id: "${globalId}") {
         ... on Image {
           id
           post
           source_url
           media_details {
             sizes {
               name
               source_url
             }
           }
         }
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const { data: { medium: { id, post, source_url, media_details } } } = result;

  expect(id).toBe(globalId);
  expect(post).toBe(postId);
  expect(source_url).toBeDefined();
  expect(media_details.sizes.length).toBeGreaterThan(0);
});
