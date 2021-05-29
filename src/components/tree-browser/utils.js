/**
 * @typedef {Object} TreeChildren
 * @property {{[x in string]: CreateTreeNodeOption}} expandableChildren
 * @property {Array<{id: string, name: string, label: string}>} nonExpandableChildren
 */

/**
 * @typedef {Object} CreateTreeNodeOption
 * @property {string} id
 * @property {string} label
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
    referencedType,
    isExpanded = false,
  } = options;
  const treeNode = {
    id,
    children,
    isChildrenFetched,
    direction: [...direction, id],
    label,
    referencedType,
    isExpanded,
  };

  return JSON.parse(JSON.stringify(treeNode));
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
    const id = `${parentDirection.join('-')}-${currentChild.name}`
    expandableChildren[id] = createTreeNode({
      id,
      label: currentChild.displayName,
      referencedType: currentChild.referencedType,
      direction: parentDirection
    });
  }

  for (let i = 0; i < allNonExpandableChildrenRaw.length; i += 1) {
    const currentChild = allNonExpandableChildrenRaw[i];
    if (currentChild.name !== "id") {
      nonExpandableChildren.push({
        id: `${parentDirection.join('-')}-${currentChild.name}`,
        label: currentChild.displayName,
        name: currentChild.name,
        direction: parentDirection
      });
    }
  }

  return {
    expandableChildren,
    nonExpandableChildren,
  };
};
