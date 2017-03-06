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
         slug
         taxonomies
         rest_base
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const { data: { type: {
    id,
    name,
    description,
    hierarchical,
    slug,
    taxonomies,
    rest_base,
  } } } = result;

  expect(id).toBe(globalId);
  expect(name).toBe('Posts');
  expect(description).toBeDefined();
  expect(hierarchical).toBe(false);
  expect(slug).toBe('post');
  const expected = ['category', 'post_tag'];
  expect(taxonomies).toEqual(expect.arrayContaining(expected));
  expect(rest_base).toBe('posts');
});
