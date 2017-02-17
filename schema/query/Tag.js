import TagCollectionType from 'type/Tag/Collection';
import TagType from 'type/Tag';
import Tag from 'data/Tag';
import { itemResolver } from 'utils';
import { pagination, filter, slug, taxonomy } from 'query/args';

export default {
  tags: {
    type: TagCollectionType,
    args: Object.assign({}, pagination, filter, slug, taxonomy),
    resolve: (root, args) => ({ args }),
  },
  tag: itemResolver(TagType, Tag),
};
