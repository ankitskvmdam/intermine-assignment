import { useState, useEffect } from "react";
import { Select } from "../select";
import { Tree } from "./tree";
import { createTreeNode, getTreeChildrenFromModelClassObject } from "./utils";

import "./tree-browser.css";

export const TreeBrowser = (props) => {
  const { model } = props;
  const [tree, setTree] = useState({});
  const [classes, setClasses] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState("");

  const resetTree = (rootClass) => {
    setTree(
      createTreeNode({
        id: "root",
        isChildrenFetched: true,
        label: rootClass.displayName,
        children: getTreeChildrenFromModelClassObject(rootClass, ["root"]),
      })
    );
  };
  /**
   *
   * @param {React.FormEvent<HTMLSelectElement>} event
   */
  const onChangeSelectedDataType = (event) => {
    const value = event.currentTarget.value;
    setSelectedDataType(value);
    resetTree(model.classes[value]);
  };

  const updateClasses = () => {
    const modelClassesKeys = Object.keys(model.classes);
    const classesArray = [];

    for (let i = 0; i < modelClassesKeys.length; i += 1) {
      const currentClassKey = modelClassesKeys[i];
      classesArray.push({
        value: currentClassKey,
        label: model.classes[currentClassKey].displayName,
      });
    }

    setClasses(classesArray);
    setSelectedDataType(classesArray[0].value);
    resetTree(model.classes[classesArray[0].value]);
  };

  useEffect(() => {
    if (model && model.classes) {
      updateClasses();
    }
  }, [model]);

  return (
    <div>
      <Select
        label="Select Data Type"
        selected={selectedDataType}
        onChange={onChangeSelectedDataType}
        options={classes}
      />
      <hr />
      <Tree
        tree={tree}
        setTree={setTree}
        node={tree}
        model={model}
        classes={classes}
      />
    </div>
  );
};
