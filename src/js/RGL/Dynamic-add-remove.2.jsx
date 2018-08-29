import React, { Component } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayout = getFromLS("items", "rgl-7") || [];

import Dustbin from "../Single Target/Dustbin";
import { iconsTypeMap } from "./Skeleton";

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
import { newGUID } from "../commonFns";
import { get_endDragElement } from "../Single Target/Toolbox";

import Highchart1 from "../Chart/Demo/HighChart";
import Highchart2 from "../Chart/Demo/HighChart2";

import Griditem from "./Griditem";

export default class AddRemoveLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
    rowHeight: 60
  };

  constructor(props) {
    super(props);

    this.state = {
      items: originalLayout,

      // items: [0, 1, 2].map(function(i, key, list) {
      //   return {
      //     name: i.toString(),
      //     i: i.toString(),
      //     x: i,
      //     y: 0,
      //     w: 1,
      //     h: 1,
      //     add: i === (list.length - 1).toString()
      //   };
      // }),
      newCounter: originalLayout.length.toString(),
      selected: ""
    };
    this.canvasRef = React.createRef();

    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.onResizeStart = this.onResizeStart.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
    this.toolboxDrop = this.toolboxDrop.bind(this);

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  createElement(el) {
    const removeStyle = {
      // // position: "absolute",
      // right: "5px",
      // // top: 0,
      // // cursor: "pointer"
      //  marginLeft: "auto",
      // marginRight: "5px"
    };

    const contentStyle = {
      background: "#e3cdcd",
      width: "100%",
      height: "100%"
    };

    const i = el.add ? "+" : el.i;
    const uid = newGUID();

    return (
      <div
        style={{ height: "100%", width: "100%", position: "absolute" }}
        key={i}
        data-grid={el}
        className="container-fluid"
      >
        <div>
          <div className="row">
            <div className="col-10">
              {i} {el.name && el.name != i ? " " + el.name : ""}
            </div>
            <div
              className="col-2"
              style={removeStyle}
              onClick={this.onRemoveItem.bind(this, i)}
            >
              x
            </div>
          </div>

          <div className="row" style={contentStyle}>
            {el.add ? (
              <div
                className="add text"
                onClick={this.onAddItem}
                title="You can add an item by clicking here, too."
              >
                Add +
              </div>
            ) : (
              <div style={contentStyle}>
                <Highchart1 />
              </div>
            )}
          </div>
        </div>{" "}
      </div>
    );
  }

  onAddItem(name) {
    const chartType = iconsTypeMap[name];
    console.log(chartType);
    const uid = newGUID();

    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        uid: uid,
        type: chartType,
        name: name ? name : "",
        i: "n" + this.state.items.length.toString(),
        x: this.state.items.length % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 1,
        h: 1
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout) {
    this.props && this.props.onLayoutChange
      ? this.props.onLayoutChange(layout)
      : null;
    this.setState({ layout: layout });
    saveToLS("items", layout,"rgl-7");
  }

  onRemoveItem(i) {
    console.log("removing", i);

    const items = _.reject(this.state.items, { i: i });

    saveToLS("items", items,"rgl-7");
    this.setState({ items: items });
  }

  toolboxDrop() {
    console.log("toolboxDrop");
    this.onAddItem();
  }

  html_onDragEnter(e) {
    this.preventDefault(e);
    console.log("html_onDragEnter");
    // this.onAddItem();
  }

  html_onDragOver(e) {
    console.log("html_onDragOver");
  }

  preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  html_onDrop(e) {
    const props = get_endDragElement();
    props ? console.log(props.name) : null;
    console.log("html_onDrop");

    this.onAddItem(props.name);
  }

  onDragStart(layout, oldItem, newItem, placeholder, e, element) {
    console.log("rgl: onDragStart");
  }
  // Calls on each drag movement.
  onDrag(layout, oldItem, newItem, placeholder, e, element) {
    console.log("rgl: onDrag");
  }
  // Calls when drag is complete.
  onDragStop(layout, oldItem, newItem, placeholder, e, element) {
    console.log("rgl: onDragStop");
  }
  // Calls when resize starts.
  onResizeStart(layout, oldItem, newItem, placeholder, e, element) {
    console.log("rgl: onResizeStart");
  }
  // Calls when resize movement happens.
  onResize(layout, oldItem, newItem, placeholder, e, element) {
    console.log("rgl: onResize");
  }
  // Calls when resize is complete.
  onResizeStop(layout, oldItem, newItem, placeholder, e, element) {
    console.log("rgl: onResizeStop");
    debugger;

    newItem;

    // chart.setSize(null);

    // this.refs.chart.resize(width, height);

    // chart.setSize(this.offsetWidth - 20, this.offsetHeight - 20, false);
  }

  onWidthChange(layout, oldItem, newItem, placeholder, e, element) {}

  render() {
    return (
      <div>
        {/*
        <button onClick={this.onAddItem}>Add Item</button>
         
        <Dustbin2 dropCallback={this.toolboxDrop}> </Dustbin2>
        */}

        <div
          onDragEnter={e => this.html_onDragEnter(e)}
          onDragOver={e => this.preventDefault(e)}
          onDrop={e => this.html_onDrop(e)}
        >
          <ResponsiveReactGridLayout
            ref={this.canvasRef}
            onDragStart={this.onDragStart}
            onDrag={this.onDrag}
            onDragStop={this.onDragStop}
            onResizeStart={this.onResizeStart}
            onResize={this.onResize}
            onResizeStop={this.onResizeStop}
            onWidthChange={this.onWidthChange}
            onLayoutChange={this.onLayoutChange}
            onBreakpointChange={this.onBreakpointChange}
            {...this.props}
          >
            {_.map(this.state.items, el => this.createElement(el))}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    );
  }
}

function getFromLS(prop, key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(key)) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[prop];
}

function saveToLS(valueKey, value, key) {
  if (global.localStorage) {
    global.localStorage.setItem(
      key,
      JSON.stringify({
        [valueKey]: value
      })
    );
  }
}

