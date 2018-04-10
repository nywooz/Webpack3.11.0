import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";

//import TileForm from "./form/Tile";
//import { tileData } from "./data/data";
import { MuiThemeProvider, getMuiTheme } from "material-ui";
//import Dnd from "./React DnD/01 Dustbin/Copy or Move/index";
//import Dnd from "./React DnD/01 Dustbin/Multiple Targets/index";

function findMappedDataFeedCols(mappedColumns, dataFeedCols) {
  return mappedColumns.map((item, i, array) => {
    return {
      ...item,
      ...{
        text: item.datasource.columnName
      },
      ...{
        id: dataFeedCols.find((it, i) => it.Name === item.datasource.columnName)
          .ColumnIndex
      },
      ...{
        mappedDataFeedInfo: dataFeedCols.find(
          (it, i) => it.Name === item.datasource.columnName
        )
      }
    };
  });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  render() {
    // const { props } = this;
    // const modal_root = document.querySelector("#modal-root");
    // const tableData = tileData[0];

    // const chartType = tableData.type;
    // const dataFeedCols = tableData.dataSet.Columns || [];

    // const bins = [
    //   {
    //     name: "mappedColumns",
    //     text: "mapped",
    //     box: findMappedDataFeedCols(chartType.table.columns, dataFeedCols)
    //   },
    //   {
    //     name: "sortedColumns",
    //     text: "sorted",
    //     box: findMappedDataFeedCols(chartType.table.sort, dataFeedCols)
    //   }
    // ];

    // const cols = [
    //   {
    //     name: "datafeed",
    //     text: "Data Feed",
    //     box: dataFeedCols.map((item, i, array) => {
    //       return {
    //         ...{ name: item.Name },
    //         ...{ text: item.Name },
    //         ...{ id: item.ColumnIndex }
    //       };
    //     })
    //   }
    // ];

    //return <Dnd boxes={cols} bins={bins} />;
    return <p >test</p>;

    return (
      <MuiThemeProvider>
        <TileForm
          fullscreen={true}
          modal_root={modal_root}
          modal={false}
          autoScrollBodyContent={true}
          data={tableData}
          open={true}
          title={tableData ? "Edit Tile" : "New Tile"}
        />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#bodyRow"));
