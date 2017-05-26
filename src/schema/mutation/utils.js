import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

function resolveMaybeThunk(thingOrThunk) {
  return typeof thingOrThunk === 'function' ? thingOrThunk() : thingOrThunk;
}

export function mutationWithClientMutationId(config) {
  const {
    name,
    description,
    deprecationReason,
    inputFields,
    outputFields,
    mutateAndGetPayload,
  } = config;
  const augmentedInputFields = () => ({
    ...resolveMaybeThunk(inputFields),
    clientMutationId: {
      type: GraphQLString,
    },
  });
  const augmentedOutputFields = () => ({
    ...resolveMaybeThunk(outputFields),
    clientMutationId: {
      type: GraphQLString,
    },
  });

  const outputType = new GraphQLObjectType({
    name: `${name}Payload`,
    fields: augmentedOutputFields,
  });

  const inputType = new GraphQLInputObjectType({
    name: `${name}Input`,
    fields: augmentedInputFields,
  });

  return {
    type: outputType,
    description,
    deprecationReason,
    args: {
      input: {
        type: new GraphQLNonNull(inputType),
      },
    },
    resolve: (_, { input }, context, info) => (
      Promise.resolve(mutateAndGetPayload(input, context, info))
        .then((payload) => {
          // eslint-disable-next-line no-param-reassign
          payload.clientMutationId = input.clientMutationId;
          return payload;
        })
    ),
  };
}
