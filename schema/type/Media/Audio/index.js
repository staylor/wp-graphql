import {
  GraphQLObjectType,
} from 'graphql';

import MediaInterface from 'interface/Media';
import mediaFields from 'type/Media/fields';
import AudioDetails from 'type/Media/Audio/Details';

const Audio = new GraphQLObjectType({
  name: 'Audio',
  description: 'An object.',
  interfaces: [MediaInterface],
  isTypeOf(media) {
    return media.mime_type.indexOf('audio') === 0;
  },
  fields: (
    Object.assign({}, mediaFields, {
      media_details: { type: AudioDetails },
    })
  ),
});

export default Audio;
