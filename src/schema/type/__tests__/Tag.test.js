import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/tags/282

it('GraphQL should return a known tag', async () => {
  const globalId = toGlobalId('Tag', 282);
  const query = `
     query Q {
       tag(id: "${globalId}") {
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
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const { data: { tag: { name, count, description, slug, taxonomy, meta } } } = result;

  expect(count).toBeGreaterThan(0);
  expect(description).toBeDefined();
  expect(name).toBe('285 Kent');
  expect(slug).toBe('285-kent');
  expect(taxonomy.slug).toBe('post_tag');
  expect(meta).toBeNull();
});
