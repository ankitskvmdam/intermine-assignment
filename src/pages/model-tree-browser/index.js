import React, { useState, useEffect } from "react";

// Services
import { fetchModel } from "../../services/model";

// Utils
import { adapterForModel } from "../../utils/model-tree";

// Stylesheet
import "./model-tree-browser.css";

// Components
import { Select } from "../../components/select";

// Constants
import { MODEL_TREE_MINES_OPTIONS } from "../../constants/model-tree";

export const ModelTreeBrowser = () => {
  const [tree, setTree] = useState({ isBuilt: false });
  const [model, setModel] = useState({ isFetched: false });
  const [selectedMine, setSelectedMine] = useState("");

  const resetTree = (initialTreeData) => {
    setTree(initialTreeData);
  };

  const updateModel = (serverResponse) => {
    const modifiedResponse = adapterForModel(serverResponse);
    setModel({ ...modifiedResponse, isFetched: true });
    resetTree({});
  };

  /**
   *
   * @param {React.FormEvent<HTMLSelectElement>} event
   */
  const onSelectMineChange = (event) => {
    setSelectedMine(event.currentTarget.value);
  };

  useEffect(() => {
    fetchModel("flymine", updateModel);
  }, [selectedMine]);

  return (
    <div className="page-container">
      <div className="wrapper">
        <Select
          onChange={onSelectMineChange}
          selected={selectedMine}
          options={MODEL_TREE_MINES_OPTIONS}
        />
      </div>
    </div>
  );
};
