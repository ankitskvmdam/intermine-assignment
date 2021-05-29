/**
 * @typedef {Object} TreeChildren
 * @property {{[x in string]: CreateTreeNodeOption}} expandableChildren
 * @property {Array<{id: string, name: string, label: string}>} nonExpandableChildren
 */

import { cloneObject } from "../../utils/misc";

/**
 * @typedef {Object} CreateTreeNodeOption
 * @property {string} id
 * @property {string} label
 * @property {string} value
 * @property {string} referencedType
 * @property {Array<string>} direction This is used for traversal
 * @property {TreeChildren} children
 * @property {boolean} isChildrenFetched
 * @property {boolean} isExpanded
 */
/**
 *
 * @param {CreateTreeNodeOption} options
 * @param {Array<string>} [parentDirection]
 * @returns {CreateTreeNodeOption}
 */
export const createTreeNode = (options) => {
  const {
    id,
    children = {},
    isChildrenFetched = false,
    direction = [],
    label = "",
    value = "",
    referencedType,
    isExpanded = false,
  } = options;
  const treeNode = {
    id,
    children,
    isChildrenFetched,
    direction: [...direction, id],
    label,
    value,
    referencedType,
    isExpanded,
  };

  return cloneObject(treeNode);
};

/**
 * @typedef {Object} ReferenceType
 * @property {string} displayName
 * @property {string} name
 * @property {string} referencedType
 */
/**
 * @typedef {Object} ModelClassObject
 * @property {{[x in string]: ReferenceType} } references
 * @property {{[x in string]: ReferenceType} } collections
 * @property {*} attributes
 */

/**
 *
 * @param {ModelClassObject} modelClassObject
 * @param {Array<string>} parentDirection
 * @returns {TreeChildren}
 */
export const getTreeChildrenFromModelClassObject = (
  modelClassObject,
  parentDirection
) => {
  const { references, collections, attributes } = modelClassObject;
  const allExpandableChildrenRaw = [
    ...Object.values(references),
    ...Object.values(collections),
  ];

  const allNonExpandableChildrenRaw = Object.values(attributes);

  const expandableChildren = {};
  const nonExpandableChildren = [];

  for (let i = 0; i < allExpandableChildrenRaw.length; i += 1) {
    const currentChild = allExpandableChildrenRaw[i];
    const id = `${parentDirection.join("-")}-${currentChild.name}`;
    expandableChildren[id] = createTreeNode({
      id,
      label: currentChild.displayName,
      referencedType: currentChild.referencedType,
      direction: parentDirection,
      value: currentChild.referencedType
    });
  }

  for (let i = 0; i < allNonExpandableChildrenRaw.length; i += 1) {
    const currentChild = allNonExpandableChildrenRaw[i];
    if (currentChild.name !== "id") {
      nonExpandableChildren.push({
        id: `${parentDirection.join("-")}-${currentChild.name}`,
        label: currentChild.displayName,
        name: currentChild.name,
        direction: parentDirection,
      });
    }
  }

  return {
    expandableChildren,
    nonExpandableChildren,
  };
};

/**
 *
 * @param {CreateTreeNodeOption} tree
 * @param {CreateTreeNodeOption} node
 * @returns {CreateTreeNodeOption}
 */
export const getTreeNodeUsingDirection = (tree, node) => {
  let expectedNode = tree;

  for (let i = 1; i < node.direction.length; i += 1) {
    expectedNode = expectedNode.children.expandableChildren[node.direction[i]];
  }
  return expectedNode;
};

/**
 *
 * @param {CreateTreeNodeOption} tree
 * @param {CreateTreeNodeOption} node
 * @param {CreateTreeNodeOption[]} children
 */
export const getNewTreeAfterAppendingChildrenToNode = (
  tree = {},
  node = {},
  children = []
) => {
  const clonedTree = cloneObject(tree);
  const clonedChildren = cloneObject(children);
  const clonedNode = cloneObject(node);

  const expectedNode = getTreeNodeUsingDirection(clonedTree, clonedNode);
  
  if (expectedNode) {
    expectedNode.children = clonedChildren;
    expectedNode.isChildrenFetched = true;

  }

  return clonedTree;
};


/**
 *
 * @param {CreateTreeNodeOption} tree
 * @param {CreateTreeNodeOption} node
 * @param {CreateTreeNodeOption} options
 */
export const updateTreeNodeState = (tree, node, options = {}) => {
  const clonedTree = cloneObject(tree);
  const clonedNode = cloneObject(node);

  const expectedNode = getTreeNodeUsingDirection(clonedTree, clonedNode)

  if (expectedNode) {
    if(options.isExpanded !== undefined ) expectedNode.isExpanded = options.isExpanded
    if(options.value !== undefined) expectedNode.value = options.value
  }

  return clonedTree
};
