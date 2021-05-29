import { useEffect } from "react";

// Components
import { RightChevron } from "./right-chevron";

// Utils
import { getTreeChildrenFromModelClassObject } from "./utils";

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
  const { classes, model, tree, setTree, node } = props;

  const handleLiClick = (node) => {
    console.log('Node', node, 'tree', tree)
  }

  useEffect(() => {
    if (model.classes) {
      const obj = getTreeChildrenFromModelClassObject(
        model.classes["ChromosomalDuplication"],
        ['root']
      );
      console.log("Obj", obj);
    }
    console.log('Tree', tree)
  }, []);

  /**
   * If tree children is present then show a message to 
   * select data type
   */
  if (!tree.children) {
    return <div>Select a data type</div>;
  }

  const expandableChildren = Object.values(tree.children.expandableChildren).sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  const nonExpandableChildren = tree.children.nonExpandableChildren.sort(
    (a, b) => a.label.localeCompare(b.label)
  );

  return (
    <div className="tree-children-container">
      <ul className="non-expandable-ul">
        {nonExpandableChildren.map((leaf) => {
          return <li className="non-expandable-li" key={leaf.id}>{leaf.label}</li>;
        })}
      </ul>
      <ul className="expandable-ul">
        {expandableChildren.map((branch) => {
          return (
            <li className='expandable-li' key={branch.id} onClick={() => handleLiClick(branch)}>
              <RightChevron className="icons" />
              <span>{branch.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
