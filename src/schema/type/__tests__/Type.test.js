import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/types/post

it('GraphQL should return a known Type', async () => {
  const globalId = toGlobalId('Type', 'post');
  const query = `
     query Q {
       type(id: "${globalId}") {
         id
         name
         description
         hierarchical
         taxonomies
         labels {
           singular
           plural
         }
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const { data: { type: { id, name, description, hierarchical, taxonomies } } } = result;

  expect(id).toBe(globalId);
  expect(description).toBeDefined();
  expect(hierarchical).toBe(false);
  expect(name).toBe('post');
  const expected = ['category', 'post_tag'];
  expect(taxonomies).toEqual(expect.arrayContaining(expected));
});
