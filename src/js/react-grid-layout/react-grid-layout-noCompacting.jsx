import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import { RaisedButton } from "material-ui";
import { Menu, Close } from "material-ui-icons";
import AutoComplete from "../dialog/Mui/AutoCompleteControlled";

import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";

import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import ContentFilter from "material-ui/svg-icons/content/filter-list";
import FileFileDownload from "material-ui/svg-icons/file/file-download";

//  https://www.npmjs.com/package/material-ui-select

const buttonStyle = {
  marginRight: 10
};

import { tileData, generateUUID } from "../data/data";
import grid_layout from "../../css/react-grid-layout.css";

const originalLayout = getFromLS("layout") || [];

import { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive); 

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
const cols = 24;

export default class NoCompactingLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: { lg: cols, md: cols, sm: cols, xs: cols, xxs: cols },
    breakpoints: { lg: 0, md: 0, sm: 0, xs: 0, xxs: 0 },
    rowHeight: 50,
    margin: [5, 5],
    minH: 1,
    minW: 1,

    // Callback so you can save the layout.
    // Calls back with (currentLayout, allLayouts). allLayouts are keyed by breakpoint.
    onLayoutChange: function () { },
    

    //
    // All callbacks below have signature (layout, oldItem, newItem, placeholder, e).
    // 'start' and 'stop' callbacks pass `undefined` for 'placeholder'.
    //

  //   // Calls when drag starts.
  //   onDragStart: function() {},
  //   // Calls on each drag movement.
  //   onDrag: function() {},
  //   // Calls when drag is complete.
  //   onDragStop: function() {},
  //   // Calls when resize starts.
  //   onResizeStart: function() {},
  //   // Calls when resize movement happens.
  //   onResize: function() {},
  //   // Calls when resize is complete.
  //   onResizeStop: function() {}
  };

  constructor(props) {
    super(props);

    this.state = {
      items: this.props.gridlayout || JSON.parse(JSON.stringify(originalLayout)) || [],
      newCounter: 0
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
    this.onNewLayout = this.onNewLayout.bind(this);    
  }


  componentDidUpdate() {
    // fires immediately after rendering with new P or S
    this.props.getlayout( this.state.items);
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };

    const i = el.add ? "+" : el.i;

    return (
      <div key={i} data-grid={el} className={el.static ? "static" : ""}>
        <Menu className="" />

        <div>Select</div>

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
          onClick={this.onRemoveItem.bind(this, i)}
        >
          <Close />
        </span>
      </div>
    );
  }

  onRemoveItem(i) {
    console.log("removing", i);
    const newItems = _.reject(this.state.items, { i: i });
    this.setState({ items: newItems });
  }

  resetLayout() {
    this.setState({
      items: []
    });
  }

  generateLayout() {
    return [0, 1, 2, 3, 4].map(function(i, key, list) {
      return {
        i: i.toString(),
        x: i * 2,
        y: 0,
        w: 2,
        h: 2,
        add: i === (list.length - 1).toString()
      };
    });
  }

  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || cols),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
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
    //this.props.onBreakpointChange(breakpoint, cols);
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
    console.log(layout);
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
  }

  onNewLayout = () => {
    this.setState({
      items: this.generateLayout()
    });
  };

  render() {
    return (
      <div>
        <RaisedButton
          label="New Layout"
          onClick={this.onNewLayout}
          style={buttonStyle}
        />

        <RaisedButton
          label="Clear Layout"
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

        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}
        >
          {_.map(this.state.items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
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
