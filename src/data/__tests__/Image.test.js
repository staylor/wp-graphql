import Media from 'data/Media';
import { dateRegex } from 'jest/utils';

// https://highforthis.com/wp-json/wp/v2/media/2724

describe('Test the fetching of Image data', () => {
  test('Collection should return a list of Media objects', async () => {
    const { items: media } = await Media.collection();
    media.forEach(m => expect(m).toBeInstanceOf(Media));
    expect(media.length).toBeGreaterThan(0);
  });

  test('Dataloader should return Image data', async () => {
    const result = await Media.load(2724);
    expect(result).toBeInstanceOf(Media);
    expect(result.id).toBe(2724);
    expect(result.date).toMatch(dateRegex);
    expect(result.date_gmt).toMatch(dateRegex);
    expect(result.modified).toMatch(dateRegex);
    expect(result.modified_gmt).toMatch(dateRegex);
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
});
