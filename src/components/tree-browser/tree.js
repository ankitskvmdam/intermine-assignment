import { cloneObject } from "../../utils/misc";

// Components
import { RightChevron } from "./right-chevron";
import { Select } from "../select";

// Utils
import {
  getTreeChildrenFromModelClassObject,
  getNewTreeAfterAppendingChildrenToNode,
  updateTreeNodeState,
} from "./utils";
import { useState } from "react";

/**
 * @typedef {Object} PropsType
 * @property {import('./utils').CreateTreeNodeOption} tree
 * @property {import('./utils').CreateTreeNodeOption} node
 * @property {Function} setTree
 * @property {Object} model
 * @property {Array<{}>} classes
 */
/**
 *
 * @param {PropsType} props
 */

export const Tree = (props) => {
  const { classes, model, tree, setTree, node: nodeProps } = props;
  const [selectedClass, setSelectedClass] = useState(nodeProps.value);

  const handleOnSelectChange = (event) => {
    const value = event.currentTarget.value
    setSelectedClass(value);

    const children = getTreeChildrenFromModelClassObject(
      model.classes[value],
      nodeProps.direction
    );

    let newTree = getNewTreeAfterAppendingChildrenToNode(tree, nodeProps, children);
    newTree = updateTreeNodeState(newTree, nodeProps, {isExpanded: true, value });

    setTree(newTree);
  };

  const handleLiClick = (node) => {
    const children = getTreeChildrenFromModelClassObject(
      model.classes[node.referencedType],
      node.direction
    );

    let newTree = cloneObject(tree);

    if (!node.isChildrenFetched) {
      newTree = getNewTreeAfterAppendingChildrenToNode(tree, node, children);
    }

    newTree = updateTreeNodeState(newTree, node, {isExpanded: !node.isExpanded});
    setTree(newTree);
  };

  /**
   * If tree children is present then show a message to
   * select data type
   */
  if (!tree.children) {
    return <div>Select a data type</div>;
  }

  const expandableChildren = Object.values(
    nodeProps.children.expandableChildren
  ).sort((a, b) => a.label.localeCompare(b.label));
  const nonExpandableChildren = nodeProps.children.nonExpandableChildren.sort(
    (a, b) => a.label.localeCompare(b.label)
  );

  return (
    <div className="tree-children-container">
      {nodeProps.id !== "root" && (
        <Select
          options={classes}
          onChange={handleOnSelectChange}
          selected={selectedClass}
        />
      )}
      <ul className="non-expandable-ul">
        {nonExpandableChildren.map((leaf) => {
          return (
            <li className="non-expandable-li" key={leaf.id}>
              {leaf.label}
            </li>
          );
        })}
      </ul>
      <ul className="expandable-ul">
        {expandableChildren.map((branch) => {
          return (
            <li
              className={`expandable-li ${
                branch.isExpanded ? "expanded" : "collapsed"
              }`}
              key={branch.id}
            >
              <div
                className="expandable-li-description"
                onClick={() => handleLiClick(branch)}
              >
                <RightChevron
                  className={`icons ${branch.isExpanded ? "rotate" : ""}`}
                />
                <span>{branch.label}</span>
              </div>
              {branch.isChildrenFetched && branch.isExpanded && (
                <Tree
                  tree={tree}
                  setTree={setTree}
                  model={model}
                  classes={classes}
                  node={branch}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
