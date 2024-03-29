import React, { Component } from "react";
import ReactDOM from "react-dom";

import AddRemoveLayout from "./Dynamic-add-remove.2";

import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Dustbin from "../Single Target/Dustbin";
import Toolbox from "../Single Target/Toolbox";

const style = { overflow: "hidden", clear: "both" };

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.boxRef = React.createRef();
    this.canvasRef = React.createRef();
    this.addChildItem = this.addChildItem.bind(this);
  }

  addChildItem(e) {
    const box = this.boxRef.current;

    const canvasRef = this.canvasRef.current;

    canvasRef.onAddItem();
  }

  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-11" style={style}>
              <AddRemoveLayout ref={this.canvasRef} />
            </div>

            <div className="col-1" style={style}>
              {icons.map((item, i) => {
                return (
                  <Toolbox
                    key={i}
                    name={item}
                    icon={item}
                    ref={this.boxRef}
                    onClick={this.addChildItem}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}

const icons = [
  "fa-chart-pie",
  "fa-chart-line",
  "fa-chart-bar",
  "fa-chart-area",
  "fa-font",
  "fa-image",
  "fa-list",
  "fa-table",
  "fa-tachometer-alt",
  "fa-layer-group"
];

export const iconsTypeMap = {
  "fa-chart-pie": "pie",
  "fa-chart-line": "line",
  "fa-chart-bar": "bar",
  "fa-chart-area": "area",
  "fa-font": "text",
  "fa-image": "image",
  "fa-list": "list",
  "fa-table": "table",
  "fa-tachometer-alt": "tachometer",
  "fa-layer-group": "carousel"
};
