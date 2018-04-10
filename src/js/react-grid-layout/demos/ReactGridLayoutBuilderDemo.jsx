import React from "react";
import ReactDOM from "react-dom";

// react-grid-layout
import { Responsive } from "react-grid-layout";
import ReactGridLayoutBuilder, {
  connectReactGridLayoutBuilder,
  withOpeningDock
} from "../react-grid-layout-builder/src";

var WidthProvider = require("react-grid-layout").WidthProvider;
var ResponsiveReactGridLayout = connectReactGridLayoutBuilder(
  WidthProvider(Responsive)
);
var DockedReactGridLayoutBuilder = withOpeningDock(ReactGridLayoutBuilder);

import Dashboard1 from "../../dashboard/Dashboard1";
import Dashboard2 from "../../bodySections/Dashboard";
import ReactHighcharts from "../../Highcharts/ReactHighcharts";

// MUI
// styling
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { muiTheme } from "../../dialog/Mui/muiTheme";

import {
  DropDownMenu,
  RaisedButton,
  SelectField,
  MenuItem,
  IconMenu,
  IconButton
} from "material-ui";

import AutoComplete from "../../dialog/Mui/AutoCompleteControlled";

const buttonStyle = {
  marginRight: 10
};

const iconStyles = {
  height: "20px",
  width: "20px",
  padding: "0 3px 3px 0"
};

const style = {
  paper: {
    // display: "inline-block",
    // float: "left",
    // margin: "16px 32px 16px 0"
  },
  rightIcon: {
    textAlign: "center",
    lineHeight: "24px"
  },
  customWidth: {
    width: 100
  },
  removeIcon: {
    left: "-6px"
  },
  menuIcon: {
    left: "-5px",
    margin: "auto"
    // top: "-2px"
  },
  title: {
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: "auto"
  },
  middlesvg: {
    margin: "auto"
  }
};

import InsertChart from "material-ui/svg-icons/editor/show-chart";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import Close from "material-ui/svg-icons/navigation/close";
import Delete from "material-ui/svg-icons/action/delete";

import {
  red500,
  blue500,
  indigo200,
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500
} from "material-ui/styles/colors";

// MUI

import {
  tileData,
  dashboardData,
  MenuItems,
  dashboardTileMenu
} from "../../data/data";
import Form from "../../form/selectTile";
import { getDataStructure as dataStructure } from "../../data/data";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";

class ReactGridLayoutBuilderDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  onDragStart(layout, oldItem, newItem, placeholder, e, element) {}
  onDrag(layout, oldItem, newItem, placeholder, e, element) {}
  onDragStop(layout, oldItem, newItem, placeholder, e, element) {}
  onResizeStart(layout, oldItem, newItem, placeholder, e, element) {}
  onResizeStart(layout, oldItem, newItem, placeholder, e, element) {}
  onResize(layout, oldItem, newItem, placeholder, e, element) {}
  onResizeStop(layout, oldItem, newItem, placeholder, e, element) {}
  onWidthChange(layout, oldItem, newItem, placeholder, e, element) {}

  activateMenu(i) {
    event.preventDefault();
    // const el = ReactDOM.findDOMNode(event.target);

    // const el = ReactDOM.findDOMNode(this._divItem);

    // const txtSpan = this._divItem.querySelector(".text");
    // txtSpan.textContent;
    // console.log(txtSpan.textContent);
    // debugger;
  }

  createElement(l, index) {
    const removestyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };

    const i = l.add ? "+" : l.i;
    const tileContent =
      this.props.get_gridItem_iContent(l, this.props.dataStructure) || i;

    //  const tileContent = <h1>Hello, world!</h1>;
    const bodyStyle = {};
    const bodyClass = "container mx-auto text-center p-0";

    const handleBackgrnd = l.static ? indigo200 : indigo200;

    const allStatic = this.props.conf.allStatic;
    if (typeof allStatic === "boolean") {
      if (l.static === false) {
        if (allStatic) {
          l.static = allStatic;
        }
      } else {
        l.static = allStatic;
      }
    }

    return (
      <div
        className="container"
        key={i}
        data-grid={l}
        style={this.props.style ? this.props.style : ""}
        ref={this.props.inputRef}
      >
        <div className="row" style={{ background: handleBackgrnd, height: 30 }}>
          <div className="col-1" style={style.middlesvg}>
            {l.static ? <FontAwesomeIcon icon="thumbtack" /> : null}
          </div>

          <div className="col" style={style.title} title={i}>
            {l.static ? "Static - " + i : i}
          </div>

          <div style={style.menuIcon} className="col-1" title="Menu">
            <IconMenu
              onChange={this.props.handleChangeSingle.bind(this, l.i)}
              style={style.paper}
              iconButtonElement={
                <IconButton className="" style={iconStyles} viewBox="0 0 20 20">
                  <MoreVertIcon />
                </IconButton>
              }
              anchorOrigin={{ horizontal: "left", vertical: "top" }}
              targetOrigin={{ horizontal: "left", vertical: "top" }}	   
            >
              {MenuItems(dashboardTileMenu)}
            </IconMenu>
          </div>
        </div>

        <div
          className="row"
          style={bodyStyle}
          ref={div => (this._divItem = div)}
          onClick={this.activateMenu.bind(this, i)}
        >
          {l.static ? (
            <div
              className={bodyClass}
              title="This item is static and cannot be removed or resized."
            >
              {tileContent}
            </div>
          ) : (
            <div className={bodyClass}>{tileContent}</div>
          )}
        </div>
      </div>
    );
  }

  generateDOM = () => {
    return _.map(
      this.props.conf.layouts.lg,
      this.createElement.bind(this),
      this
    );
  };

  render() {
    return (
      <div>
        <DockedReactGridLayoutBuilder
          reactGridLayout={this.props.conf}
          updateConfigFunc={this.props.updateConfig}
        />
        <ResponsiveReactGridLayout
          {...this.props.conf}
          updateConfigFunc={this.props.updateConfig}
          onLayoutChange={this.props.onLayoutChange}
          onDragStart={this.onDragStart}
          onDrag={this.onDrag}
          onDragStop={this.onDragStop}
          onResizeStart={this.onResizeStart}
          onResize={this.onResize}
          onResizeStop={this.onResizeStop}
          onWidthChange={this.onWidthChange}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
module.exports = ReactGridLayoutBuilderDemo;

function generateLayout() {
  return _.map(_.range(0, 6), function(item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (_.random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
}

const originalLayout =
  getFromLS("layout", "rglb-1") ||
  generateLayout() ||
  getFromLS("layout", "rglb-1") ||
  [];
const layoutMap = getFromLS("layoutMap", "rglb-2") || [];

const defaultReactGridLayoutProps = {
   preventCollision: false,
  // compactType: null,
  showGenLayout: false,
  //draggableHandle: ".title-handle",
  layoutMap: layoutMap,
  layouts: {
    lg: originalLayout
  },
  // verticalCompact: null,  //will deprecate, so do not use
  newCounter: 0,
  rowHeight: 60,
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  //cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
  cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(defaultReactGridLayoutProps, this.props || {});
    this.onAddItem = this.onAddItem.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
    this.onNewLayout = this.onNewLayout.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.itemSelected = this.itemSelected.bind(this);
    this.get_gridItem_iContent = this.get_gridItem_iContent.bind(this);
    this.handleChangeSingle = this.handleChangeSingle.bind(this);
  }

  handleChangeSingle = (gridItem_i, event, value) => {
    switch (value) {
      case "new":
        break;

      case "static":
        const newItems = this.state.layouts.lg.slice(0);
        const tile = newItems.find(function(item) {
          return gridItem_i === item.i;
        });
        tile.static = tile.static === true ? false : true;

        this.setState({
          allStatic: undefined,
          layouts: {
            lg: newItems
          }
        });

        saveToLS("layout", newItems, "rglb-1");
        break;

      case "edit":
        break;
      case "copy":
        break;
      case "search":
        const tableData = {};
        const modal_root = document.querySelector("#modal-root2");
        ReactDOM.render(
          <Form
            itemSelected={this.itemSelected}
            modal_root={modal_root}
            modal={false}
            autoScrollBodyContent={true}
            data={{
              templates: dataStructure,
              searchTerm: "",
              exclude: this.state.layoutMap.slice(),
              gridItem_i: gridItem_i,
              i: gridItem_i
            }}
            open={true}
            onAddClick={submitData => {
              this.onAddClick(submitData);
            }}
          />,
          modal_root
        );

        break;

      case "rmove":
      case "remove":
        this.onRemoveItem(gridItem_i);

        break;
      default:
        break;
    }
  };

  get_gridItem_iContent = (layoutItem, dataInfo) => {
    let tileContent = layoutItem.i;

    const layoutMapItemIndex = this.state.layoutMap.findIndex(
      layoutMapItem => layoutItem.i === layoutMapItem.i
    );
    if (layoutMapItemIndex === -1) {
      return tileContent;
    }

    const layoutMapInfo = this.state.layoutMap[layoutMapItemIndex];
    const UID = layoutMapInfo.UID;
    const layoutMapi = layoutMapInfo.i;
    const dataModule = layoutMapInfo.dataModule;

    const module_item = dataInfo.find(
      item => layoutMapInfo.dataModule === item.module
    );
    const data = module_item.data;
    const dataItem = data.find(item => item.UID === layoutMapInfo.UID);

    tileContent = dataItem && dataItem.name ? dataItem.name : tileContent;

    if (dataItem.type && dataItem.type.chart) {
      const highchartOptions = dataItem.type;
      highchartOptions.chart.width = null;
      highchartOptions.chart.height = layoutItem.h * this.state.rowHeight - 30;

      tileContent = <ReactHighcharts options={highchartOptions} />;
    }
    //  old version
    // const module_indx = dataInfo.findIndex(function(item) {
    //   return layoutMapInfo.dataModule === item.module;
    // });
    // const data = dataInfo[module_indx].data;
    // const dataIndex = data.findIndex(item => item.UID === layoutMapInfo.UID);

    // const newTxtContent =
    //   dataIndex == -1
    //     ? tileContent
    //     : dataInfo[module_indx].data[dataIndex].name;

    //  https://stackoverflow.com/questions/42037369/how-to-edit-an-item-in-a-state-array
    // let newLayout = this.state.layouts.lg.slice(); //copy the array
    // newLayout[tileIndex].i = newTxtContent; //execute the manipulations

    return tileContent;
  };

  itemSelected = obj => {
    const module = obj.module;
    const i = obj.i;

    const oldLayout = this.state.layouts.lg;
    var tileIndex = oldLayout.findIndex(function(item) {
      return obj.i === item.i;
    });

    var module_indx = dataStructure.findIndex(function(item) {
      return obj.module === item.module;
    });
    const data = dataStructure[module_indx].data;
    const dataIndex = data.findIndex(item => item.UID === obj.UID);
    const newTxtContent = dataStructure[module_indx].data[dataIndex].name;
    //  https://stackoverflow.com/questions/42037369/how-to-edit-an-item-in-a-state-array
    // let newLayout = this.state.layouts.lg.slice(); //copy the array
    // newLayout[tileIndex].i = newTxtContent; //execute the manipulations

    const index = this.state.layoutMap.findIndex(
      item => item.i === obj.gridItem_i
    );
    let action = "edit";
    if (index === -1) {
      action = "add";
      obj.gridItem_i = newTxtContent;
    } else {
      action = "edit";
      obj.new_gridItem_i = newTxtContent;
    }

    this.updateLayoutMap({ action: action, type: obj });
    this.onLayoutChange(oldLayout, this.state.layouts.lg);
  };

  updateLayoutMap = obj => {
    const type = obj.type;
    const gridItem_i = type.gridItem_i;
    const i = type.i;

    let newLayoutMap = this.state.layoutMap.slice(0);
    const index = newLayoutMap.findIndex(item => item.i === gridItem_i);

    if (index === -1 && (obj.action = "edit")) {
      obj.action = "add";
    }

    switch (obj.action) {
      case "add":
        if (index !== -1) return;
        const newItem = {
          dataModule: type.module,
          UID: type.UID,
          i: i,
          gridItem_i: gridItem_i
        };
        newLayoutMap = newLayoutMap.concat(newItem);
        break;

      case "edit":
        if (index === -1) return;
        newLayoutMap[index] = {
          dataModule: type.module,
          UID: type.UID,
          i: i,
          gridItem_i: type.new_gridItem_i
        };
        break;

      case "remove":
        if (index === -1) return;
        newLayoutMap = _.reject(newLayoutMap, { i: i });
        break;

      default:
        break;
    }

    if (obj.action) {
      this.setState({
        layoutMap: newLayoutMap
      });

      // saveToLS("layout", currentLayout, "rglb-1");
      saveToLS("layoutMap", newLayoutMap, "rglb-2");
    }
  };

  // AllLayouts are keyed by breakpoint.
  onLayoutChange = (oldLayout, currentLayout, allLayouts) => {
    this.setState({
      layouts: {
        lg: currentLayout
      }
    });
    /*eslint no-console: 0*/
    saveToLS("layout", currentLayout, "rglb-1");
    saveToLS("layoutMap", this.state.layoutMap, "rglb-2");
  };

  onMenuItemSelected = (i, menuItem_obj) => {
    debugger;
    const value = menuItem_obj.props.value;
    const txt = menuItem_obj.props.primaryText;

    console.log(value);
    console.log(txt);
  };

  onTileMenuClick = i => {
    debugger;
    const txtSpan = this._divItem.querySelector(".text");
    txtSpan.textContent;
    console.log(txtSpan.textContent);
  };

  updateConfig = config => {
    this.setState(config);
  };

  onRemoveItem = i => {
    const oldLayout = this.state.layouts.lg;
    const newItems = _.reject(oldLayout, { i: i });
    this.setState({
      layouts: {
        lg: newItems
      }
    });

    this.updateLayoutMap({
      action: "remove",
      type: { UID: null, module: null, i: i, gridItem_i: i }
    });
  };

  onNewLayout = () => {
    this.setState({
      layouts: {
        lg: generateLayout()
      },
      layoutMap: [],
      newCounter: 0
    });
  };

  resetLayout = () => {
    this.setState({
      layouts: {
        lg: []
      },
      layoutMap: [],
      newCounter: 0
    });
  };

  onAddItem() {
    if (typeof this.state.layouts.lg === "undefined") {
      this.state.layouts.lg = [];
    }

    const oldLayout = this.state.layouts.lg;
    const newItem = {
      i: "New " + this.state.newCounter,
      x: (oldLayout.length * 2) % this.state.cols.lg,
      y: Infinity, // puts it at the bottom
      w: 2,
      h: 2
    };

    const all_items = oldLayout.concat(newItem);

    this.setState({
      layouts: {
        lg: all_items
      },
      newCounter: this.state.newCounter + 1
    });
  }

  render() {
    const showGenLayout = this.state.showGenLayout;
    const gridClss = showGenLayout
      ? "col col-lg-10 col-md-9 col-xs-12"
      : "col col-lg-12 col-md-12 col-xs-12";
    const JsonOutputClss = showGenLayout
      ? "col col-lg-2 col-md-3 hidden-xs"
      : "";

    return (
      <MuiThemeProvider>
        <div className="container-fluid">
          <div className="row">
            <div className={gridClss}>
              <div>
                <RaisedButton
                  label="Reset"
                  onClick={this.resetLayout}
                  style={buttonStyle}
                />

                <RaisedButton
                  label="Random Layout"
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
              </div>

              <ReactGridLayoutBuilderDemo
                handleChangeSingle={this.handleChangeSingle}
                dataStructure={dataStructure}
                get_gridItem_iContent={this.get_gridItem_iContent}
                itemSelected={this.itemSelected}
                conf={this.state}
                updateConfig={this.updateConfig}
                onRemoveItem={this.onRemoveItem}
                onLayoutChange={this.onLayoutChange}
              />
            </div>

            {this.state.showGenLayout && (
              <div className={JsonOutputClss}>
                <h5>Generated Layout:</h5>
                <pre>
                  <code>{JSON.stringify(this.state, null, 2)}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
module.exports = App;

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

function saveToLS(key, value, k) {
  if (global.localStorage) {
    global.localStorage.setItem(
      k,
      JSON.stringify({
        [key]: value
      })
    );
  }
}
