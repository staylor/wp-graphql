import { GraphQLString } from 'graphql';
import MEDIA_TYPE from 'enum/MediaType';
import Description from 'type/Description';
import Caption from 'type/Caption';
import MediaType from 'type/Media';
import Media from 'data/Media';

export const featuredMedia = () => ({
  type: MediaType,
  description: 'The featured media for the object.',
  resolve: ({ featured_media: featured }) => (featured > 0 ? Media.load(featured) : null),
});

export const description = {
  description: {
    type: Description,
  },
};

export const caption = {
  caption: {
    type: Caption,
  },
};

export const altText = {
  alt_text: {
    type: GraphQLString,
    description: 'Alternative text to display when attachment is not displayed.',
  },
};

export const mediaType = {
  media_type: {
    type: MEDIA_TYPE,
  },
};

export const mimeType = {
  mime_type: {
    type: GraphQLString,
    description: 'The attachment MIME type.',
  },
};

export const sourceUrl = {
  source_url: {
    type: GraphQLString,
    description: 'URL to the original attachment file.',
  },
};
