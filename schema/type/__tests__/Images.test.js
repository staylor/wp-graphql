import { graphql } from 'graphql';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/media?media_type=image

test('GraphQL should return a collection of images', async () => {
  const query = `
     query Q {
       media(media_type: IMAGE) {
         results {
           edges {
             node {
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
         }
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const { edges } = result.data.media.results;

  edges.forEach(({ node }) => {
    expect(node.id).toBeDefined();
    expect(node.post).toBeDefined();
    expect(node.source_url).toBeDefined();
    expect(node.media_details.sizes.length).toBeGreaterThan(0);
  });
});
