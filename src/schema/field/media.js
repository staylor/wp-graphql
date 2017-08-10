import { GraphQLString } from 'graphql';
import MEDIA_TYPE from 'enum/MediaType';
import Description from 'type/Description';
import Caption from 'type/Caption';
import MediaType from 'type/Media';

export const featuredMedia = () => ({
  type: MediaType,
  description: 'The featured media for the object.',
  resolve: (
    { featured_media: featured },
    args,
    context,
    { rootValue: { loaders: { Media } } }
  ) => (featured > 0 ? Media.load(featured) : null),
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
  altText: {
    type: GraphQLString,
    description: 'Alternative text to display when attachment is not displayed.',
  },
};

export const mediaType = {
  mediaType: {
    type: MEDIA_TYPE,
  },
};

export const mimeType = {
  mimeType: {
    type: GraphQLString,
    description: 'The attachment MIME type.',
  },
};

export const sourceUrl = {
  sourceUrl: {
    type: GraphQLString,
    description: 'URL to the original attachment file.',
  },
};
