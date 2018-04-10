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
import { dashboardData, dashboardColumns, generateUUID } from "../data/data";
import { save_ToLS, get_FromLS } from "../data/data";

// form
import Form from "../form/Dashboard";

import { FlatButton } from "material-ui";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      tableDataArr: dashboardData
    };

    this.openDialog = this.openDialog.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {
    // clean up the mess
  }

  openDialog(tableData) {
    let latestData;
    if (typeof tableData !== "undefined") {
      const LSData = get_FromLS(tableData.UID);
      latestData = tableData;

      const dateUpdatedObj = new Date(tableData.dateUpdated).getTime();
      let LSdateUpdatedObj;
      if (LSData.dateUpdated) {
        LSdateUpdatedObj = new Date(LSData.dateUpdated).getTime();
      }
      if (typeof LSdateUpdatedObj === "undefined") {
        latestData = tableData;
      } else {
        latestData = dateUpdatedObj > LSdateUpdatedObj ? tableData : LSData;
      }
    }
    const modal_root = document.querySelector("#modal-root");
    ReactDOM.render(
      <Form
        modal_root={modal_root}
        modal={false}
        fullscreen={true}
        autoScrollBodyContent={true}
        data={latestData}
        open={this.state.open}
        title={latestData ? "Edit" : "New"}
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

    save_ToLS(submitData);

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
          columns={dashboardColumns}
          tableData={this.state.tableDataArr}
          openDialog={row_data => {
            this.openDialog(row_data);
          }}
        />
      </div>
    );
  }
}
