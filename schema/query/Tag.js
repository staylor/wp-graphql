import { GraphQLList } from 'graphql';

import Tag from 'type/Tag';
import { resolveWithArgs, itemResolver } from 'utils';
import { tags } from 'data';
import { pagination, filter, slug, taxonomy } from 'query/args';

export default {
  tags: {
    type: new GraphQLList(Tag),
    args: Object.assign({}, pagination, filter, slug, taxonomy),
    resolve: resolveWithArgs('/tags'),
  },
  tag: itemResolver(Tag, tags),
};
