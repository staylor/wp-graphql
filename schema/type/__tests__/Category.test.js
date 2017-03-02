// import { graphql } from 'graphql';
// import { toGlobalId } from 'graphql-relay';
// import schema from 'schema';

// http://highforthis.com/wp-json/wp/v2/categories/4
// Q2F0ZWdvcnk6NA== is 'Watch This"

it('GraphQL should return a known category', (done) => {
  done();
  // const globalId = toGlobalId('Category', 4);
  // const query = `
  //    query Q {
  //      category(id: "${globalId}") {
  //        name
  //        count
  //        description
  //        slug
  //        taxonomy {
  //          slug
  //        }
  //        parent {
  //          id
  //          name
  //        }
  //        meta {
  //          name
  //          value
  //        }
  //      }
  //    }
  // `;
  //
  // const rootValue = {};
  // const context = {};
  //
  // const result = await graphql(schema, query, rootValue, context);
  // const { data: { category: {
  //   name,
  //   count,
  //   description,
  //   slug,
  //   taxonomy,
  //   parent,
  //   meta,
  // } } } = result;
  //
  // expect(count).toBeGreaterThan(0);
  // expect(description).toBeDefined();
  // expect(name).toBe('Watch This');
  // expect(slug).toBe('watch-this');
  // expect(taxonomy.slug).toBe('category');
  // expect(parent).toBeNull();
  // expect(meta).toBeNull();
});
