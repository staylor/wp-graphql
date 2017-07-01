import { toGlobalId } from 'graphql-relay';
import ViewerType from 'type/Viewer';

const root = {};
// eslint-disable-next-line no-underscore-dangle
const fields = ViewerType._typeConfig.fields();

describe('Test Viewer type', () => {
  test('Test name', () => {
    expect(ViewerType.name).toMatchSnapshot();
  });

  test('Test fields', () => {
    expect(Object.keys(ViewerType.getFields())).toMatchSnapshot();
  });

  test('Test resolve post via slug and item resolver', async () => {
    const post = await fields.post.resolve(root, {
      slug: 'this-is-a-post',
    });
    expect(post).toMatchSnapshot();
  });

  test('Test resolve post via id and item resolver', async () => {
    const post = await fields.post.resolve(root, {
      id: toGlobalId('Post', 13),
    });
    expect(post).toMatchSnapshot();
  });

  test('Test resolve category via term', async () => {
    const term = await fields.term.resolve(root, {
      slug: 'watch-this',
      taxonomy: 'category',
    });
    expect(term).toMatchSnapshot();
  });

  test('Test resolve tag via term', async () => {
    const term = await fields.term.resolve(root, {
      slug: 'dirty-projectors',
      taxonomy: 'tag',
    });
    expect(term).toMatchSnapshot();
  });

  test('Test resolve null term', () => {
    expect(
      fields.term.resolve(root, {
        slug: 'pizza',
        taxonomy: 'whatever',
      })
    ).toBeNull();
  });

  test('Test resolve settings', async () => {
    const settings = await fields.settings.resolve();
    expect(settings).toMatchSnapshot();
  });

  test('Test resolve chart', async () => {
    const chart = await fields.chart.resolve();
    expect(chart).toMatchSnapshot();
  });
});
