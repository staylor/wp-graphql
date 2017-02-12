import {
  GraphQLObjectType,
} from 'graphql';

import MediaInterface from 'interface/Media';
import fields from 'type/Media/fields';
import VideoDetails from 'type/Media/Video/Details';

const Video = new GraphQLObjectType({
  name: 'Video',
  description: 'An object.',
  interfaces: [MediaInterface],
  isTypeOf(media) {
    return media.mime_type.indexOf('video') === 0;
  },
  fields: (
    Object.assign({}, fields, {
      media_details: { type: VideoDetails },
    })
  ),
});

export default Video;
