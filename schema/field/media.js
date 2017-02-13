import {
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import MEDIA_TYPE from 'enum/MediaType';

import Description from 'type/Description';
import Caption from 'type/Caption';
import Media from 'type/Media';
import { media } from 'data';

/* eslint-disable camelcase */

export const featuredMedia = () => ({
  type: Media,
  description: 'The featured media for the object.',
  resolve: data => (
    data.featured_media > 0 ? media.load(data.featured_media) : null
  ),
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

export const post = {
  type: GraphQLInt,
  description: 'The ID for the associated post of the attachment.',
};

export const source_url = {
  type: GraphQLString,
  description: 'URL to the original attachment file.',
};
