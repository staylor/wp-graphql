import {
  featuredMedia,
  description,
  caption,
  altText,
  mediaType,
  mimeType,
  sourceUrl,
} from 'field/media';

describe('Test schema type field definition', () => {
  test('Test featuredMedia field', () => {
    const field = featuredMedia();
    expect(field.type.name).toMatchSnapshot();
  });

  test('Test featuredMedia field resolver', async () => {
    const field = featuredMedia();
    expect.assertions(1);
    return expect(field.resolve({ featured_media: 69 })).resolves.toMatchSnapshot();
  });

  test('Test featuredMedia field resolver null', () => {
    const field = featuredMedia();
    expect(field.resolve({ featured_media: 0 })).toBeNull();
  });

  test('Test description field', () => {
    const { description: field } = description;
    expect(field.type).toMatchSnapshot();
  });

  test('Test caption field', () => {
    const { caption: field } = caption;
    expect(field.type.name).toMatchSnapshot();
  });

  test('Test altText field', () => {
    const { alt_text: field } = altText;
    expect(field.type).toMatchSnapshot();
  });

  test('Test mediaType field', () => {
    const { media_type: field } = mediaType;
    expect(field.type.name).toMatchSnapshot();
  });

  test('Test mimeType field', () => {
    const { mime_type: field } = mimeType;
    expect(field.type).toMatchSnapshot();
  });

  test('Test sourceUrl field', () => {
    const { source_url: field } = sourceUrl;
    expect(field.type).toMatchSnapshot();
  });
});
