import COMMENT_STATUS from 'enum/CommentStatus';
import PING_STATUS from 'enum/PingStatus';

/* eslint-disable camelcase */

export const comment_status = {
  type: COMMENT_STATUS,
  description: 'Whether or not comments are open on the object.',
};

export const ping_status = {
  type: PING_STATUS,
  description: 'Whether or not the object can be pinged.',
};
