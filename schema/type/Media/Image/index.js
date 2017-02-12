import {
  GraphQLObjectType,
} from 'graphql';

import MediaInterface from 'interface/Media';
import mediaFields from 'type/Media/fields';
import ImageDetails from 'type/Media/Image/Details';

const Image = new GraphQLObjectType({
  name: 'Image',
  description: 'An object.',
  interfaces: [MediaInterface],
  isTypeOf(media) {
    return media.mime_type.indexOf('image') === 0;
  },
  fields: (
    Object.assign({}, mediaFields, {
      media_details: { type: ImageDetails },
    })
  ),
});

export default Image;
