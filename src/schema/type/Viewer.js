import { GraphQLObjectType, GraphQLString } from 'graphql';
import {
  globalIdField,
  connectionArgs,
  connectionFromArraySlice,
  fromGlobalId,
} from 'graphql-relay';
import { itemResolver } from 'utils';
import NavMenuType from 'type/NavMenu';
import NavMenu from 'data/NavMenu';
import SidebarType from 'type/Sidebar';
import Sidebar from 'data/Sidebar';
import Post from 'data/Post';
import { PostConnection } from 'type/Post/Collection';
import POST_ORDERBY from 'enum/PostOrderby';
import ORDER from 'enum/Order';

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: globalIdField(),
    navMenu: itemResolver(NavMenuType, NavMenu),
    sidebar: itemResolver(SidebarType, Sidebar),
    posts: {
      type: PostConnection,
      args: {
        search: { type: GraphQLString },
        author: { type: GraphQLString },
        slug: { type: GraphQLString },
        orderby: { type: POST_ORDERBY },
        order: { type: ORDER },
        // value or comma-separated values
        categories: { type: GraphQLString },
        tags: { type: GraphQLString },
        ...connectionArgs,
      },
      description: 'A list of results',
      resolve: (root, args) => {
        const connectionArguments = {};
        const params = Object.assign({}, args);
        if (params.first) {
          params.per_page = params.first;
          connectionArguments.first = params.first;
          params.order = 'ASC';
        } else if (params.last) {
          params.per_page = params.last;
          connectionArguments.last = params.last;
        } else {
          params.per_page = 10;
        }

        ['categories', 'tags', 'author'].forEach((key) => {
          if (params[key]) {
            params[key] = params[key].split(',').map(value => fromGlobalId(value).id);
          }
        });

        delete params.first;
        delete params.last;
        delete params.after;
        delete params.before;

        return Post.collection(params).then(({ items, total }) =>
          connectionFromArraySlice(items, connectionArguments, {
            arrayLength: total ? parseInt(total, 10) : items.length,
            sliceStart: params.offset || 0,
          }),
        );
      },
    },
  },
});

export default ViewerType;
