import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import { getMockSchema } from 'jest/utils';
import getLoaders from 'data/loaders';

const context = {};
const rootValue = {
  loaders: getLoaders(),
};

const queryByID = `
  query NodeQuery($id: ID!) {
    node(id: $id) {
      __typename
    }
  }
`;

describe('Test Node queries', () => {
  const schema = getMockSchema({
    Category: () => ({
      __typename: 'Category',
    }),
    Tag: () => ({
      __typename: 'Tag',
    }),
    Page: () => ({
      __typename: 'Page',
    }),
    Post: () => ({
      __typename: 'Post',
    }),
    User: () => ({
      __typename: 'User',
    }),
    Sidebar: () => ({
      __typename: 'Sidebar',
    }),
    NavMenu: () => ({
      __typename: 'NavMenu',
    }),
  });

  test('GraphQL should return a node by category ID', async () => {
    const variables = {
      id: toGlobalId('Category', 1),
    };
    const result = await graphql(schema, queryByID, rootValue, context, variables);
    expect(result).toMatchSnapshot();
  });

  test('GraphQL should return a node by tag ID', async () => {
    const variables = {
      id: toGlobalId('Tag', 1),
    };
    const result = await graphql(schema, queryByID, rootValue, context, variables);
    expect(result).toMatchSnapshot();
  });

  test('GraphQL should return a node by post ID', async () => {
    const variables = {
      id: toGlobalId('Post', 1),
    };
    const result = await graphql(schema, queryByID, rootValue, context, variables);
    expect(result).toMatchSnapshot();
  });

  test('GraphQL should return a node by page ID', async () => {
    const variables = {
      id: toGlobalId('Page', 1),
    };
    const result = await graphql(schema, queryByID, rootValue, context, variables);
    expect(result).toMatchSnapshot();
  });

  test('GraphQL should return a node by user ID', async () => {
    const variables = {
      id: toGlobalId('User', 1),
    };
    const result = await graphql(schema, queryByID, rootValue, context, variables);
    expect(result).toMatchSnapshot();
  });

  test('GraphQL should return a node by sidebar ID', async () => {
    const variables = {
      id: toGlobalId('Sidebar', 1),
    };
    const result = await graphql(schema, queryByID, rootValue, context, variables);
    expect(result).toMatchSnapshot();
  });

  test('GraphQL should return a node by NavMenu ID', async () => {
    const variables = {
      id: toGlobalId('NavMenu', 1),
    };
    const result = await graphql(schema, queryByID, rootValue, context, variables);
    expect(result).toMatchSnapshot();
  });
});
