import React from 'react';
import ReactDOM from 'react-dom';


const $ = require('jquery');
$.DataTable = require('datatables.net-responsive-bs4'); //require('datatables.net');


import { dtsett } from '../datatables/settings';

// Add Button
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

// form
import TileForm from '../form/Tile'

// styling
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { muiTheme } from '../dialog/Mui/muiTheme';

const style = {
  right: 20,
  bottom: 20,
  position: 'fixed',
  zIndex: 4
};

const columns = [
  {
    data: "name",
    title: "Name"
  },
  {
    data: "description",
    title: "Description"
  },
  {
    data: "dateUpdated",
    title: "Date Modified"
  },
  {
    data: "enabled",
    title: "Enabled",
    "className": "dt-center",
    "targets": "_all",
    "render": function (data, type, full) {
      return (data) ? '<i class="fa fa-circle  text-success"></i>' : '<i class="fa fa-circle text-danger"></i>'
    }
  },
  {
    data: "tileType",
    title: "TileType"
  },
  {
    data: "dynamicFilter",
    title: "DynamicFilter"
  },
  {
    data: "refreshRate",
    title: "Refresh rate (s)",
    "render": function (data, type, full) {
      return (data) ? '<span class="badge badge-secondary">' + data + '</span>' : '<span class="badge badge-secondary"></span>'
    }
  },
];

//  https://github.com/BorisKozo/react-datatables/blob/master/src/Input.js
export default class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {  };
    //this.handleChange = this.handleChange.bind(this); 
  }

  componentDidMount() {
    var table = $(this.refs.main).DataTable({
      columns,
      data: this.props.tableData,
      dom: dtsett.dom,
      ordering: dtsett.ordering,
      order: dtsett.order,
      language: dtsett.language,
      pageLength: dtsett.pageLength,
      lengthMenu: dtsett.lengthMenu
    });

    $(this.refs.main).on('dbldblclick', 'tr', function (e) {
      const row_data = table.row(this).data();
      handleAdd(row_data);
    });
    
  }


  componentWillUnmount() {
    const table = this.getTable();
    table.destroy(true);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.names.length !== this.props.names.length) {
      reloadTableData(nextProps.names);
    } else {
      updateTable(nextProps.names);
    }
    return false;
  }

  getTable() {
    return $('.dataTables_wrapper').find('table').DataTable();
  }

  reloadTableData() {
    const table = this.getTable();

    table.clear();
    table.rows.add(data2);
    table.draw();
    console.log("table reloaded");
  }

  updateTable(names) {
    const table = this.getTable();

    let dataChanged = false;
    table.rows().every(function () {
      const oldNameData = this.data();
      const newNameData = names.find((nameData) => {
        return nameData.name === oldNameData.name;
      });
      if (oldNameData.nickname !== newNameData.nickname) {
        dataChanged = true;
        this.data(newNameData);
      }
      return true; // RCA esLint configuration wants us to 
      // return something
    });

    if (dataChanged) {
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
          width="100%" />

        <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
          <FloatingActionButton
            onClick={(e) => { handleAdd() }}
            secondary={true}
            style={style}>
            <ContentAdd />
          </FloatingActionButton>
        </MuiThemeProvider>

        <button
          className="btn btn-default btn-sm"
          onClick={(e) => { this.reloadTableData(this.props) }}>
          Reload Table
        </button>

      </div>);
  }
}


function handleAdd(tableData) {
  const fields = [
    {
      "name": {
        "key": "name",
        "mui-element":
          {
            "element": "TextField",
            name: "name",
            defaultValue: "",
            hintText: "Name",
            floatingLabelText: "Name",
            fullWidth: true,
          }
      }
    },
    {
      "description": {
        "key": "description",
        "mui-element":
          {
            "element": "TextField",
            name: "description",
            defaultValue: "",
            hintText: "Description",
            floatingLabelText: "Description",
            fullWidth: true,
          }
      }
    },
    {
      "name": {
        "key": "name",
        "mui-element":
          {
            "element": "TextField",
            name: "name",
            defaultValue: "",
            hintText: "Name",
            floatingLabelText: "Name",
            fullWidth: true,
          }
      }
    },
    {

      "Description": "tile2 to display sales",
      "Enabled": true,
      "TileType": "Dynamic List",
      "DynamicFilter": false,
      "tileType": "tileType",
      "DataSet": "DataSet",
      "Connection": "Connection",
      "RefreshRate": 0.2,
    }
  ];
  
  const modal_root = document.querySelector("#modal-root");
  ReactDOM.render(
    <TileForm
      modal_root={modal_root}
      data={tableData}
      open={true}
      title={tableData ? "Edit Tile" : "New Tile"}
    />,
    modal_root
  );
}


const data2 = [
  {
    "UID": "524083fe-22e8-4def-f8ab-97b5f9f03052",
    "Name": "tile1 2",
    "Description": "tile1 to display sales",

    "Enabled": true,
    "TileType": "Dynamic Text", // "Dynamic List","Dynamic Graph","Image","Wallboard"
    "DynamicFilter": false,



    "Title": "tile1 header",
    "Footer": "tile1 footer2",
    "DateCreated": "Fri Dec 08 2017",
    "DateUpdated": "Fri Dec 10 2017",
    "tileType": "tileType",
    "DataSet": "DataSet",
    "Connection": "Connection",
    "RefreshRate": 0.5,

  },

  {
    "UID": "2a3872e9-1798-40ad-d2b2-1a8014a744c2",
    "Name": "tile2 2",
    "Description": "tile2 to display sales",

    "Enabled": true,
    "TileType": "Dynamic List",
    "DynamicFilter": false,


    "Title": "tile2 header",
    "Footer": "tile2 footer",
    "DateCreated": "Fri Dec 08 2017",
    "DateUpdated": "Fri Dec 10 2017",
    "tileType": "tileType",
    "DataSet": "DataSet",
    "Connection": "Connection",
    "RefreshRate": 0.2,
  },

  {
    "UID": "1e273d11-1364-4500-d173-7bd819c9fdd7",
    "Name": "aaa 2",
    "Description": "aaa to display sales",

    "Enabled": true,
    "TileType": "Dynamic Graph",
    "DynamicFilter": false,

    "Title": "aaa header",
    "Footer": "aaa footer",
    "DateCreated": "Fri Dec 08 2017",
    "DateUpdated": "Fri Dec 10 2017",
    "tileType": "tileType",
    "DataSet": "DataSet",
    "Connection": "Connection",
    "RefreshRate": 0.2,
  }

];