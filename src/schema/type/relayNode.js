import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

const registeredTypes = {};

export function registerNodeType(type) {
  registeredTypes[type.name] = type;
  return type;
}

export const { nodeInterface: NodeInterface, nodeField } = nodeDefinitions(globalId => {
  const { id, type } = fromGlobalId(globalId);
  switch (type) {
    default:
      return null;
  }
}, obj => registeredTypes[obj.constructor.name] || null);
