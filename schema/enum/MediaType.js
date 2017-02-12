import { GraphQLEnumType } from 'graphql';

const MEDIA_TYPE = new GraphQLEnumType({
  name: 'MEDIA_TYPE',
  values: {
    IMAGE: { value: 'image' },
    VIDEO: { value: 'video' },
    AUDIO: { value: 'audio' },
    APPLICATION: { value: 'application' },
  },
});

export default MEDIA_TYPE;
