import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";

// styling
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { muiTheme } from "../../dialog/Mui/muiTheme";

import {
  RaisedButton,
  SelectField,
  MenuItem,
  IconMenu,
  IconButton
} from "material-ui";
import { Menu, Close } from "material-ui-icons";

import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import Customicons from "../../Mui/mui-icons";


///////////////////     react-grid-layout         ////////////////
import grid_layout from "../../../css/react-grid-layout.css";
import rglb from "../../../css/react-grid-layout-with-builder.css";   ///node_modules/react-grid-layout-builder/css/styles.css

import YourOwnBuilderEditor from "../react-grid-layout-builder/src/materialUIEditor";


// //YourOwnBuilderEditor is a copy of src/bootstrapEditor with your own style and your own fields
import ReactGridLayoutBuilder, { connectReactGridLayoutBuilder } from 'react-grid-layout-builder';
// //the responsive react-grid-layout is wrapped to be connected to the builder functions
// const ResponsiveReactGridLayout = connectReactGridLayoutBuilder(WidthProvider(Responsive)); 






//import ReactGridLayoutBuilder, {connectReactGridLayoutBuilder, withOpeningDock} from '../../src';
//import { Grid, Row, Col, FormGroup, FormControl, Checkbox, ControlLabel, HelpBlock, InputGroup } from 'react-bootstrap';






const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS("layout") || [];

const buttonStyle = {
  marginRight: 10
};

/**
 * This layout demonstrates how to sync to localstorage.
 */
let GridDefaultProps = {
  className: "layout",
  cols: 24,
  rowHeight: 30
};

export default class LocalStorageLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: GridDefaultProps.cols,
    rowHeight: 30,

    onLayoutChange: function() {}
  };

  constructor(props) {
    super(props);
    this.state = {
      cols: GridDefaultProps.cols,
      newCounter: 0,
      layout:        
        this.props.gridlayout ||
        JSON.parse(JSON.stringify(originalLayout))
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onAddItem = this.onAddItem.bind(this); 
    this.resetLayout = this.resetLayout.bind(this);
    this.onNewLayout = this.onNewLayout.bind(this);    

  }


  onNewLayout = () => {
    this.setState({
      layout: this.generateLayout()
    });
  };

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

  resetLayout() {
    this.setState({
      layout: []
    });
  }

  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      layout: this.state.layout.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.layout.length * 2) % (this.state.cols || cols),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });

  }

  onRemoveItem(i) {
    console.log("removing", i);
    const newItems = _.reject(this.state.layout, { i: i });
    this.setState({ layout: newItems });
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

  onLayoutChange(layout) {

    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    this.setState({ layout });
    this.props.onLayoutChange(layout); // updates status display
    console.log(layout);
  }

  generateDOM() {
    return _.map(this.state.layout, this.createElement.bind(this), this);
  }




  render() {
    return (
      <MuiThemeProvider>
        <div>
          <RaisedButton
            label="Reset"
            onClick={this.resetLayout}
            style={buttonStyle}
          />

          <RaisedButton
            label="New Layout"
            secondary={true}
            onClick={this.onNewLayout}
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
      </MuiThemeProvider>
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
