import React, { useState, useEffect } from "react";

// Services
import { fetchModel } from "../../services/model";

// Utils
import { adapterForModel } from "../../utils/model-tree";

// Stylesheet
import "./model-tree-browser.css";

// Components
import { Select } from "../../components/select";
import { TreeBrowser } from "../../components/tree-browser";

// Constants
import { MODEL_TREE_MINES_OPTIONS } from "../../constants/model-tree";
import * as fetchState from '../../constants/fetch';


export const ModelTreeBrowser = () => {
  const [model, setModel] = useState({ fetch: fetchState.NOT_FETCHED });
  const [selectedMine, setSelectedMine] = useState("FLYMINE");

  const updateModel = (serverResponse) => {
    if(serverResponse.statusCode === 200) {
      const modifiedResponse = adapterForModel(serverResponse);
      setModel({ ...modifiedResponse, fetch: fetchState.FETCHED_SUCCESSFULLY });
    } else {
      setModel({ fetch: fetchState.FETCHED_FAILED})
    }
  };

  /**
   *
   * @param {React.FormEvent<HTMLSelectElement>} event
   */
  const onSelectMineChange = (event) => {
    setSelectedMine(event.currentTarget.value);
  };

  useEffect(() => {
    setModel({ fetch: fetchState.FETCHING })
    fetchModel(selectedMine, updateModel);
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
        {model.fetch === fetchState.FETCHED_SUCCESSFULLY && <TreeBrowser model={model} />}
        {model.fetch === fetchState.FETCHED_FAILED && <div>Fetching failed. Please try after sometime...</div>}
        {model.fetch === fetchState.FETCHING && <div>Fetching data...</div>}
      </div>
    </div>
  );
};
