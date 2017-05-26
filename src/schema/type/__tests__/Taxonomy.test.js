import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import schema from 'schema';

// https://highforthis.com/wp-json/wp/v2/taxonomies/category

it('GraphQL should return a known Taxonomy', async () => {
  const globalId = toGlobalId('Taxonomy', 'category');
  const query = `
     query Q {
       taxonomy(id: "${globalId}") {
         id
         name
         description
         hierarchical
         slug
         types
         rest_base
       }
     }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const {
    data: { taxonomy: { id, name, description, hierarchical, slug, types, rest_base } },
  } = result;

  expect(id).toBe(globalId);
  expect(name).toBe('Categories');
  expect(description).toBeDefined();
  expect(hierarchical).toBe(true);
  expect(slug).toBe('category');
  const expected = ['post'];
  expect(types).toEqual(expect.arrayContaining(expected));
  expect(rest_base).toBe('categories');
});
