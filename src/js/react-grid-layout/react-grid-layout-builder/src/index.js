import React, { Component } from "react";
import PropTypes from "prop-types";
import MaterialUIEditor from "./materialUIEditor";
import connectReactGridLayoutBuilderToEditor from "./connectReactGridLayoutBuilderToEditor";

var ReactGridLayoutBuilder = connectReactGridLayoutBuilderToEditor(
  MaterialUIEditor
);

export withOpeningDock from "./components/withOpeningDock";
export connectReactGridLayoutBuilder from "./connectReactGridLayoutBuilder";
export connectReactGridLayoutBuilderToEditor from "./connectReactGridLayoutBuilderToEditor";
export MaterialUIEditor from "./materialUIEditor";
export default ReactGridLayoutBuilder;
