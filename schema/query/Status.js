import StatusCollectionType from 'type/Status/Collection';
import StatusType from 'type/Status';
import Status from 'data/Status';
import { itemResolver } from 'utils';

export default {
  statuses: {
    type: StatusCollectionType,
    resolve: (root, args) => ({ args }),
  },
  status: itemResolver(StatusType, Status),
};
