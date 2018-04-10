import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import { RaisedButton } from "material-ui";

const buttonStyle = {
  marginRight: 10
};
import { generateUUID } from "../data/data";

import grid_layout from "../../css/react-grid-layout.css";
// import { Responsive, WidthProvider } from "react-grid-layout";
// const ResponsiveReactGridLayout = WidthProvider(Responsive);

// import Config from "./react-grid-config";
import { Menu, Close } from "material-ui-icons";

import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS("layout") || [];
/**
 * This layout demonstrates how to sync to localstorage.
 */
export default class NoCompactingLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    randomItems:8,
    cols: 12,
    rowHeight: 30,
    verticalCompact: null,
    onLayoutChange: function() {}
  };

  constructor(props) {
    super(props);

    this.state = {
      layout:
        JSON.parse(JSON.stringify(originalLayout)) || this.generateLayout(),
      newCounter: 0
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
  }

  
  createElement(el, index) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };

    const i = el.add ? "+" : el.i;

    return (
      <div key={index} data-grid={el} className={el.static ? "static" : ""}>
        <Menu className="" />
        <div>Select Tile</div>
        {el.static ? (
          <span
            className="text"
            title="This item is static and cannot be removed or resized."
          >
            Static - {i}
          </span>
        ) : (
          <span className="text">{i}</span>
        )}

        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, el.i)}
        >
          <Close />
        </span>
      </div>
    );
  }


  resetLayout() {
    this.setState({
      layout: []
    });
  }

  onNewLayout = () => {
    this.setState({
      layout: this.generateLayout()
    });
  };

  onAddItem() {

    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      layout: this.state.layout.concat({
        i: "n" + this.state.newCounter,
        x: 0,  //(this.state.layout.length * 2) % (this.props.cols || 12),
        y: 0, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ layout: _.reject(this.state.layout, { i: i }) });
  }


  generateLayout() {
    const p = this.props;
    const cols = p.cols;
    const randomItems = p.randomItems;

    return _.map(
      _.range(0, p.randomItems),
      function(item, i) {
        var y = Math.ceil(Math.random() * 4) + 1;
        var w = Math.ceil(Math.random() * 4) + 1;
        return {
          i: i.toString(),
          x: (_.random(0, cols) * 2) % cols,
          y: Math.floor(i / 6) * y,
          w: 2,
          h: y,
          static: Math.random() < 0.05
        };
      },
      cols
    );
  }


  generateDOM() {
    return _.map(this.state.layout, this.createElement.bind(this), this);
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  onLayoutChange(layout) {
    console.log(layout);
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    this.setState({ layout });
    this.props.onLayoutChange(layout); // updates status display
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Generate New Layout "
          onClick={this.onNewLayout}
          style={buttonStyle}
        />

        <RaisedButton
          label="Reset Layout"
          secondary={true}
          onClick={this.resetLayout}
          style={buttonStyle}
        />

        <RaisedButton
          label="Add Tile"
          primary={true}
          onClick={this.onAddItem}
          style={buttonStyle}
        />

        <ReactGridLayout
          {...this.props}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
        >
          {this.generateDOM()}
        </ReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value
      })
    );
  }
}
