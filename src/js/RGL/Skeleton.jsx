import React, { Component } from "react";
import ReactDOM from "react-dom";

import AddRemoveLayout from "./Dynamic-add-remove";
import Toolbox from "./Drag-Toolbox";

import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Dustbin from "../Single Target/Dustbin";
import Box from "../Single Target/Toolbox";

const style = { overflow: "hidden", clear: "both" };

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-11" style={style}>
              <AddRemoveLayout />
            </div>

            <div className="col-1" style={style}>

              {Icons.map((item, i) => {
                return <Box key={i} name={item} icon={item} />
              })}
            </div>
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}

// import AddRemoveLayout from "./js/RGL/Dynamic-add-remove";
// ReactDOM.render(<AddRemoveLayout />, rootEl);


const Icons = [
  "fa-chart-pie",
  "fa-chart-line",
  "fa-chart-bar",
  "fa-chart-area",
  "fa-font"
];
