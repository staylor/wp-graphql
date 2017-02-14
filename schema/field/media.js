import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import MEDIA_TYPE from 'enum/MediaType';

import Description from 'type/Description';
import Caption from 'type/Caption';
import MediaType from 'type/Media';
import Media from 'data/Media';

import { toGlobalId } from 'utils';

/* eslint-disable camelcase */

export const featuredMedia = () => ({
  type: MediaType,
  description: 'The featured media for the object.',
  resolve: ({ featured_media }) => {
    if (featured_media > 0) {
      return Media.load(toGlobalId('Media', featured_media));
    }
    return null;
  },
});

export const description = { type: Description };

export const caption = { type: Caption };

export const alt_text = {
  type: GraphQLString,
  description: 'Alternative text to display when attachment is not displayed.',
};

export const media_type = { type: MEDIA_TYPE };

export const mime_type = {
  type: GraphQLString,
  description: 'The attachment MIME type.',
};

export const source_url = {
  type: GraphQLString,
  description: 'URL to the original attachment file.',
};
