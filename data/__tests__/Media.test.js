import { toGlobalId } from 'graphql-relay';
import Media from 'data/Media';

// https://highforthis.com/wp-json/wp/v2/media/2724

it('Dataloader should return a Media', async () => {
  const result = await Media.load(toGlobalId('Media', 2724));
  expect(result instanceof Media).toBe(true);
  expect(result.id).toBe(2724);
  expect(result.date).toBe('2017-02-23T14:14:55');
  expect(result.date_gmt).toBe('2017-02-23T19:14:55');
  expect(result.modified).toBe('2017-02-23T14:14:55');
  expect(result.modified_gmt).toBe('2017-02-23T19:14:55');
  expect(result.guid.rendered).toBeDefined();
  expect(result.slug).toBe('19mag-19dirtyprojectors-t_ca0-superjumbo');
  expect(result.type).toBe('attachment');
  expect(result.title.rendered).toBeDefined();
  expect(result.author).toBe(1);
  expect(result.comment_status).toBe('open');
  expect(result.ping_status).toBe('closed');
  expect(result.template).toBeDefined();
  expect(result.description.rendered).toBeDefined();
  expect(result.caption.rendered).toBeDefined();
  expect(result.alt_text).toBeDefined();
  expect(result.media_type).toBeDefined();
  expect(result.mime_type).toBeDefined();
  expect(result.media_details).toBeDefined();
  expect(result.post).toBe(2723);
  expect(result.source_url).toBeDefined();
});
