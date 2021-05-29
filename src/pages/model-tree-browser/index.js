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
import { TreeBrowser } from "../../components/tree-browser";

export const ModelTreeBrowser = () => {
  const [model, setModel] = useState({ isFetched: false });
  const [selectedMine, setSelectedMine] = useState("FLYMINE");

  const updateModel = (serverResponse) => {
    const modifiedResponse = adapterForModel(serverResponse);
    setModel({ ...modifiedResponse, isFetched: true });
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
          label="Select Mine"
          onChange={onSelectMineChange}
          selected={selectedMine}
          options={MODEL_TREE_MINES_OPTIONS}
        />
        <TreeBrowser model={model} />
      </div>
    </div>
  );
};
