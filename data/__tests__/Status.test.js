import { toGlobalId } from 'graphql-relay';
import Status from 'data/Status';

// https://highforthis.com/wp-json/wp/v2/statuses/publish

it('Dataloader should return a Status', async () => {
  const result = await Status.load(toGlobalId('Status', 'publish'));
  expect(result instanceof Status).toBe(true);
  expect(result.name).toBe('Published');
  expect(result.public).toBe(true);
  expect(result.queryable).toBe(true);
  expect(result.slug).toBe('publish');
});
