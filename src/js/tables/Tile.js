import React from "react";
import ReactDOM from "react-dom";

const $ = require("jquery");
$.DataTable = require("datatables.net-responsive-bs4"); //require('datatables.net');

import { dtsett } from "../datatables/settings";

// Add Button
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

// styling
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { muiTheme } from "../dialog/Mui/muiTheme";

import { tileType } from "../data/data";

const style = {
  right: 20,
  bottom: 20,
  position: "fixed",
  zIndex: 4
};

//  https://github.com/BorisKozo/react-datatables/blob/master/src/Input.js
export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openDialog = this.openDialog.bind(this);
  }

  openDialog(row_data) {
    this.props.openDialog(row_data);
  }

  componentDidMount() {
    const columns = this.props.columns;

    let table = $(this.refs.main).DataTable({
      columns,
      data: this.props.tableData,
      dom: dtsett.dom,
      ordering: dtsett.ordering,
      order: dtsett.order,
      language: dtsett.language,
      pageLength: dtsett.pageLength,
      lengthMenu: dtsett.lengthMenu
    });

    const that = this;
    $(this.refs.main)
      .on("dblclick", "tr", function(e) {
        const row_data = table.row(this).data();
        that.openDialog(row_data);
      })
      .on("touchstart", "tr", function(e) {
        const row_data = table.row(this).data();
        that.openDialog(row_data);
      });

    // not working
    // debugger;
    // this.refs.main.rows.onTouchTap=that.handleTouchTap;
    //onTouchTap={that.handleTouchTap}
  }

  componentWillUnmount() {
    const table = this.getTable();
    table.destroy(true);
  }

  shouldComponentUpdate(nextProps) {
    this.reloadTableData(nextProps.tableData);

    // need to investigate issue when create new, then edit it
    // if (nextProps.tableData.length !== this.props.tableData.length) {
    //   //only for new items
    //   this.reloadTableData(nextProps.tableData);
    // } else {
    //   //only for edited items
    //   this.updateTable(nextProps.tableData);
    // }
    return false;
  }

  // handleTouchTap() {
  //   debugger;
  // }

  getTable() {
    return $(".dataTables_wrapper")
      .find("table")
      .DataTable();
  }

  reloadTableData(tableData) {
    const table = this.getTable();
    table.clear();
    table.rows.add(tableData);
    table.draw();

    // table.clear();
    // table.rows.add(data2);
    // table.draw();
    // console.log("table reloaded");
  }

  // exclusively for modified
  updateTable(tableData) {
    const table = this.getTable();
    let modified = false;

    table.rows().every(function() {
      const oldtableData = this.data();

      const newtableData = tableData.find((item, index) => {
        if (item.editStatus === "Modified" || item.editStatus === "New") {
          return item;
        }
      });

      if (oldtableData.UID === newtableData.UID) {
        modified = true;
        this.data(newtableData);
      }

      return true; // RCA esLint configuration wants us to
      // return something
    });

    if (modified) {
      table.draw();
    }
  }

  render() {
    return (
      <div>
        <table
          className="display table table-striped"
          ref="main"
          cellSpacing="0"
          width="100%"
        />

        <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
          <FloatingActionButton
            onClick={e => {
              this.openDialog();
            }}
            secondary={true}
            style={style}
          >
            <ContentAdd />
          </FloatingActionButton>
        </MuiThemeProvider>

        <button
          className="btn btn-default btn-sm"
          onClick={e => {
            this.reloadTableData(this.props);
          }}
        >
          Reload Table
        </button>
      </div>
    );
  }
}
