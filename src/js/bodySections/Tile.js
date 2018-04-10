import React, { Component } from "react";
import ReactDOM from "react-dom";
import dtcss from "../../css/datatables.min.css";

import "material-design-lite/material";

// styling
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { muiTheme } from "../dialog/Mui/muiTheme";

import PropTypes from "prop-types";
import Table from "../../js/tables/Tile";

import ReactGridLayout from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

//json Data
import {
  tileData,
  tileColumns,
  tileDefaultState,
  generateUUID
} from "../data/data";

// form
import TileForm from "../form/Tile";

import { FlatButton } from "material-ui";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      tableDataArr: tileData
    };

    this.openDialog = this.openDialog.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {
    // clean up the mess
  }

  openDialog(tableData) {
    const actions = [
      <FlatButton
        key="0"
        type="reset"
        label="Reset"
        secondary={true}
        style={{ float: "left" }}
        onClick={this.handleReset}
      />,

      <FlatButton
        key="1"
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,

      <FlatButton
        key="2"
        type="submit"
        label="OK"
        primary={true}
        onClick={submitData => {
          this.onAddClick(submitData);
        }}
      />
    ];

    const modal_root = document.querySelector("#modal-root");
    ReactDOM.render( 
      <TileForm
        modal_root={modal_root}
        modal={false}
        fullscreen={true}
        autoScrollBodyContent={true}
        actions={actions}
        data={tableData}
        open={this.state.open}
        title={tableData ? "Edit Tile" : "New Tile"}
        onAddClick={submitData => {
          this.onAddClick(submitData);
        }}
      />,
      modal_root
    );
  }

  onAddClick(submitData) {
    let editStatus = "New";

    const dateNowStr = new Date().toString();
    let editExisting = false;
    const result = this.state.tableDataArr.map(tableDataItem => {
      if (tableDataItem.UID === submitData.UID) {
        editExisting = true;
        submitData.editStatus = "Modified";
        submitData.dateUpdated = dateNowStr;
        return submitData;
      }
      return tableDataItem;
    });

    if (!editExisting) {
      submitData.UID = generateUUID();
      submitData.editStatus = "New";
      submitData.dateCreated = submitData.dateUpdated = dateNowStr;
      result.push(submitData);
    }

    this.setState({
      tableDataArr: result
    });

    // //editStatus:"NoChange"
    // "Modified"
    // "Deleted"
    // "New"
  }

  render() {
    const { props } = this;
    return (
      <div className="App">
        <Table
          columns={tileColumns}
          tableData={this.state.tableDataArr}
          openDialog={row_data => {
            this.openDialog(row_data);
          }}

        />
      </div>
    );
  }
}
