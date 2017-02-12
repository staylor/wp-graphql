import { GraphQLUnionType } from 'graphql';

import Image from 'type/Media/Image';
import Audio from 'type/Media/Audio';
import Video from 'type/Media/Video';

const Media = new GraphQLUnionType({
  name: 'Media',
  types: [Image, Audio, Video],
});

export default Media;
