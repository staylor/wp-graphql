import { GraphQLList } from 'graphql';

import TagType from 'type/Tag';
import Tag from 'data/Tag';
import { resolveWithArgs, itemResolver } from 'utils';
import { pagination, filter, slug, taxonomy } from 'query/args';

export default {
  tags: {
    type: new GraphQLList(TagType),
    args: Object.assign({}, pagination, filter, slug, taxonomy),
    resolve: resolveWithArgs('/tags', Tag),
  },
  tag: itemResolver(TagType, Tag),
};
