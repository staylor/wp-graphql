import Status from 'data/Status';

// https://highforthis.com/wp-json/wp/v2/statuses/publish

describe('Test the fetching of Status data', () => {
  test('Collection should return a list of Status objects', async () => {
    const statuses = await Status.collection();
    statuses.forEach(status => expect(status).toBeInstanceOf(Status));
    expect(statuses.length).toBeGreaterThan(0);
  });

  test('Dataloader should return a Status', async () => {
    const result = await Status.load('publish');
    expect(result).toBeInstanceOf(Status);
    expect(result.name).toBe('Published');
    expect(result.public).toBe(true);
    expect(result.queryable).toBe(true);
    expect(result.slug).toBe('publish');
  });
});
