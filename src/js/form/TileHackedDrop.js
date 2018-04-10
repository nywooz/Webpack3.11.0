import React, { Component } from "react";
import ReactDOM from "react-dom";
// import update from 'react-addons-update';
import update from "immutability-helper";

import Form, {
  MuiThemeProvider,
  getMuiTheme,
  Dialog,
  FlatButton,
  MenuItem,
  TextField,
  TimePicker,
  DatePicker,
  SelectField,
  Checkbox,
  Toggle,
  Slider,
  RadioButtonGroup,
  RadioButton,
  DropDownMenu,
  Switch,
  Card,
  CardHeader,
  CardText
} from "material-ui";

//import AutoCompleteControlled2 from "../dialog/Mui/AutoCompleteControlled2";
import AutoCompleteControlled from "../dialog/Mui/AutoCompleteControlled";
import {
  MenuItems,
  MenuItemSelectable,
  tileDefaultState,
  refreshRates,
  names,
  tileType,
  chartvalues,
  generateUUID,
  getFullScreenDialogStyle,
  tileTab,
  RealTimeFeeds
} from "../data/data";

// styling
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import { muiTheme } from "../dialog/Mui/muiTheme";
import { styles } from "../dialog/Mui/styles";
export default class TileForm extends React.Component {
  defaultState = {
    name: "",
    description: "",
    dynamicFilter: false,
    enable: true,
    tileType: "",
    type: {},
    refreshRate: "0",
    title: "My Chart",
    subtitle: "My Untitled Chart",
    footer: ""
  };

  constructor(props) {
    super(props);
    this.state = Object.assign(this.defaultState, this.props.data);

    this.handleClose = this._handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this._handleChangeSelect = this._handleChangeSelect.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.focusTextInput = this.focusTextInput.bind(this);
    this.handleHighchartDataSetChange = this.handleHighchartDataSetChange.bind(
      this
    );

    this.handleHighchartDataChange = this.handleHighchartDataChange.bind(this);
    this.handleOtherChartDataChange = this.handleOtherChartDataChange.bind(
      this
    );
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    debugger;
    this.textInput.focus();
  }

  componentWillUnmount() {}

  handleReset() {
    let oldState = this.state;
    newState = { ...this.defaultState, oldState };
    this.setState({
      newState
    });
  }

  handleHighchartDataChange(e, value, name) {
    // const target = e.target;
    // name = name || target.name;
    // const targetValue = target.value;
    this.setState({
      dataSet: value
    });
  }

  handleHighchartDataSetChange(e, value) {
    this.setState({
      type: value
    });
  }

  handleOtherChartDataChange(e, value) {
    this.handleHighchartDataSetChange(e, value);
  }

  _handleChangeSelect(e, index, value) {
    const name = this._searchFilter.props.name;
    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  handleUpdateInput(name, value) {
    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  handleNewRequest(name, text, value) {
    this.setState({
      [name]: text
    });

    if (name === "tileType") {
      this.setTileTypeConfig(text);
    }
    console.log(this.state);
  }

  handleChange(e, isInputChecked) {
    const target = e.target;
    //  https://stackoverflow.com/questions/28478945/react-js-cant-change-checkbox-state
    let value = target.type === "checkbox" ? isInputChecked : target.value;
    const name = target.name;

    // const {name, value} = e.target;
    // value = e.target.type === "checkbox" ? isInputChecked : value;

    if (typeof value === "string") {
      if (value === "true") {
        value = true;
      } else if (value === "false") {
        value = false;
      }
    }

    this.setState({
      [name]: value
    });

    // var fields = { ...this.state }
    // fields[name] = value;
    // this.setState(fields);
    console.log(this.state);
  }

  _handleClose() {
    this.setState({ open: false });
    ReactDOM.unmountComponentAtNode(this.props.modal_root);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAddClick
      ? this.props.onAddClick(this.state)
      : console.log(this.state);

    // const {foo, bar, baz} = this.state;
    // this.setState(() => ({
    //   status: `Submitted Foo: ${foo}, Bar: ${bar}, Baz: ${baz}`
    // }))

    // pass the input field value to the event handler passed
    // as a prop by the parent (App)
    this.handleClose();
  }

  setTileTypeConfig(value) {
    debugger;
    //import chart selector from data
  }

  render() {
    const { props } = this;

    const actions = [
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
        keyboardFocused={true}
        primary={true}
        onClick={e => {
          this.handleSubmit(e);
        }}
      />
    ];

    const dialogTitle = true;
    let customContentStyle = {};
    let bodyStyle = {};
    if (this.props.fullscreen) {
      const objStyle = getFullScreenDialogStyle(dialogTitle);
      //customContentStyle = objStyle.customContentStyle;
      bodyStyle = objStyle.bodyStyle;

      customContentStyle = {
        width: "100%",
        maxWidth: "none",
        top: "-80px",
        height: "100vh"
        //background: "#9c9cf3"
      };
      bodyStyle.padding = 0;
      bodyStyle.maxHeight = "unset";
      bodyStyle.minHeight = !dialogTitle ? "unset" : bodyStyle.minHeight;
      //bodyStyle.background = "#c1f9b3";
    }

    const type = this.state.type; //this.props.data.type; //this.state.type; //  this.props.data.type
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <MuiThemeProvider>
        <div>
          <Dialog
            title={dialogTitle ? props.title : null}
            autoScrollBodyContent={true}
            modal={this.props.modal}
            open={this.props.open}
            actions={actions}
            onRequestClose={this.handleClose}
            contentStyle={customContentStyle}
            bodyStyle={bodyStyle}
          >
            <form
              //style={{background : "#c1f9b3"}}
              // style={bodyStyle}
              onSubmit={e => {
                this.handleSubmit(e);
              }}
            >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-4" style={{ padding: 0 }}>
                    <TabsExampleIconText
                      handleHighchartDataSetChange={
                        this.handleHighchartDataSetChange
                      }
                      handleNewRequest={this.handleNewRequest}
                      handleUpdateInput={this.handleUpdateInput}
                      handleChange={this.handleChange}
                      type={type}
                      handleOtherChartDataChange={
                        this.handleOtherChartDataChange
                      }
                      handleHighchartDataChange={this.handleHighchartDataChange}
                      st={this.state}
                    />
                  </div>

                  <div className="col-8">
                    <Previewer
                      handleUpdateInput={this.handleUpdateInput}
                      handleHighchartDataSetChange={
                        this.props.handleHighchartDataSetChange
                      }
                      handleOtherChartDataChange={
                        this.handleOtherChartDataChange
                      }
                      handleHighchartDataChange={this.handleHighchartDataChange}
                      type={type}
                      st={this.state}
                    />
                  </div>
                </div>
              </div>
            </form>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

import { Tabs, Tab } from "material-ui/Tabs";
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from "react-swipeable-views";
import FontIcon from "material-ui/FontIcon";
import MapsPersonPin from "material-ui/svg-icons/maps/person-pin";

export class TabsExampleIconText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    };
  }

  handleChange = value => {
    this.setState({
      slideIndex: value
    });
  };

  render() {
    const props = this.props.st;
    const slideIndex = this.state.slideIndex;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Tabs onChange={this.handleChange} value={slideIndex}>
            {tileTab.map((tab, index) => (
              <Tab
                key={index}
                style={styles.headline}
                icon={tab.icon()}
                label={tab.primaryText}
                value={index}
              />
            ))}
          </Tabs>

          <SwipeableViews
            index={slideIndex}
            onChangeIndex={e => {
              this.handleChange(slideIndex);
            }}
          >
            <div key={0} style={styles.modalSwipeableViews}>
              <FormFieldData
                st={props}
                type={this.props.type}
                handleUpdateInput={this.props.handleUpdateInput}
                handleOtherChartDataChange={
                  this.props.handleOtherChartDataChange
                }
                handleHighchartDataSetChange={
                  this.props.handleHighchartDataSetChange
                }
                handleHighchartDataChange={this.props.handleHighchartDataChange}
              />
            </div>

            <div key={1} style={styles.modalSwipeableViews}>
              <FormFieldChart
                st={props}
                options={this.props.type}
                handleChange={this.props.handleChange}
                handleNewRequest={this.props.handleNewRequest}
                handleUpdateInput={this.props.handleUpdateInput}
                handleOtherChartDataChange={
                  this.props.handleOtherChartDataChange
                }
                handleHighchartDataChange={this.props.handleHighchartDataChange}
              />
            </div>

            <div key={2} style={styles.modalSwipeableViews}>
              <FormFieldFilter st={props} />
            </div>
            <div key={3} style={styles.modalSwipeableViews}>
              <FormFieldStyle st={props} />
            </div>
            <div key={4} style={styles.modalSwipeableViews}>
              <FormFieldAlert st={props} />
            </div>
          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    );
  }
}

class ChartTypeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.options.chart.type
    };
    this.handleHighchartDataChange = this.handleHighchartDataChange.bind(this);
  }

  handleHighchartDataChange(item) {
    const type = item.UID;
    const o = this.props.options;
    const newProp = { ...this.props.options.chart, type: type };
    o.chart = newProp;
    item.useHighChart
      ? this.props.handleHighchartDataChange(event, o)
      : this.props.handleOtherChartDataChange(event, o);
  }

  render() {
    return (
      <MenuItemSelectable
        values={chartvalues}
        handleChange={this.handleHighchartDataChange}
        selected={this.state.selected}
      />
    );
  }
}

import {
  TablePreview,
  TableConfig,
  defaultTableConfig
} from "../TilePreviewer/app";
import Container from "../React DnD/Container";

import ReactHighcharts from "../Highcharts/ReactHighcharts";
import { TilePreviewer, TextConfig } from "../TilePreviewer/app";

function GetHighchartSeries(objectOrUID) {
  let dataSet = {};

  if (typeof objectOrUID === "string") {
    const UID = objectOrUID;
    const responses = RealTimeFeeds.responses;
    dataSet =
      responses.find(function(element) {
        return element.UID === UID;
      }) || {};
  } else {
    dataSet = objectOrUID.dataSet;
  }

  const rawCols = dataSet["Columns"] || [];
  const cols = rawCols.map((item, i, array) => {
    return {
      text: item["Name"],
      id: item["ColumnIndex"]
    };
  });

  const rawRows = dataSet["Rows"] || [];
  const rows = rawRows.map(x => x["Data"]) || [];

  const series = {
    cols: cols,
    rawCols: rawCols,
    rows: rows,
    rawRows: rawRows
  };

  return series;
}

function GetMappedObject(series, mappedCols) {
  const feedCols = series.cols;
  const itemsFromFeed = feedCols.map(item => item.text);
  const savedItems = mappedCols.map(item => item.datasource.columnName);

  const cols = mappedCols.map((item, i, array) => {
    return {
      //.find((item, i, arr) => item.text == feedCol.text)
      // ...{ id: feedCols      item.datasource.columnName },
      ...{ text: item.datasource.columnName },
      item
    };
  });

  const mappedObj =
    feedCols.filter(function(i) {
      return savedItems.indexOf(i.text) !== -1;
    }) || [];

  const tableColumns = mappedObj.map((feedCol, feedindx, array) => {
    const d = mappedCols.find(
      (item, i, arr) => feedCol.text == item.datasource.columnName
    );
    return {...d,...feedCol}
  });

  const savedCols = savedItems.map((str, i, array) => {
    // return {
    //   text: item["Name"],
    //   id: item["ColumnIndex"]
    // };
  });

  //1. get columns array which match the mapped columns from table definition in data
  /*
      columns: [
          {
            style: "",
            sortable: true,
            title: "Queue ID",
            datasource: {
              columnName: "queueId"
            }
          }]
   */
  const mapColsIdx = mappedObj.map((str, i, array) => {
    return mappedCols.findIndex((col, idx, arr) => {
      return col.datasource && col.datasource.columnName
        ? str == col.datasource.columnName
        : null;
    });
  });

  //2. Next Concatenate corresponding mapColsIdx with mappedObj
  // const arrConcat = mappedObj.map((item, index, arr) => {
  //   {...item,col:mappedCols[mapColsIdx[index]]}
  // });

  const notMappedArr =
    itemsFromFeed.filter(function(i) {
      return savedItems.indexOf(i) === -1;
    }) || [];
  const notMappedObj =
    notMappedArr.map((str, i, array) => {
      return feedCols.find((item, i, arr) => item.text == str);
    }) || {};

  let rows = [];
  const rawCols = series.rawCols;
  const itemName = mappedObj[0];

  const indexes = mappedObj.map((itemName, i) => {
    return rawCols.findIndex(item => item.Name === itemName);
  });

  //debugger;

  return {
    mapped: tableColumns,
    rows: rows,
    notMapped: notMappedObj
  };
}
export { GetHighchartSeries, GetMappedObject };

class Previewer extends React.Component {
  render() {
    const type = this.props.type;

    const middleStyle = {
      position: "relative",
      top: "50%",
      transform: "translateY(-50%)"
    };

    const item = chartvalues.find(function(item) {
      return item.UID === type.chart.type;
    });
    const useHighChart = item.useHighChart ? true : false;

    return (
      <div>
        {type && useHighChart ? (
          <ReactHighcharts st={this.props.st} options={type} />
        ) : (
          <TilePreviewer
            handleUpdateInput={this.props.handleUpdateInput}
            handleHighchartDataSetChange={
              this.props.handleHighchartDataSetChange
            }
            handleOtherChartDataChange={this.props.handleOtherChartDataChange}
            options={type}
            st={this.props.st}
          />
        )}
      </div>
    );
  }
}

class FormFieldData extends React.Component {
  constructor(props) {
    super(props);
    this.handleHighchartDataChange = this.handleHighchartDataChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleHighchartDataChange(e) {
    const target = e.target;
    const targetValue = target.value;
    let name = target.name;

    if (name === "type") {
      const raw = JSON.parse(target.value);
      this.props.handleHighchartDataChange(e, raw, name);
    }
  }

  handleChange = (event, index, value) => {
    const responses = RealTimeFeeds.responses;
    // find dataset
    const dataSet = responses.find(function(element) {
      return element.UID === value;
    });

    this.props.handleHighchartDataChange(event, dataSet);
  };

  render() {
    const o = this.props.type;
    const pretty = JSON.stringify(o, undefined, 4);
    const st = this.props.st;
    const dataSet = st.dataSet;
    const responses = RealTimeFeeds.responses;
    const series = GetHighchartSeries(dataSet.UID);
    const seriesCol = series.cols;

    const tableObj = o.table ? o.table : defaultTableConfig.table;
    const tblclassName = tableObj.className;
    const outputAdvance = false;
    const mappedObj = GetMappedObject(series, tableObj.columns);
    {
      /* <textarea
          style={{ height: "500px", width: "100%" }}
          name="type"
          value={pretty}
          onChange={this.handleHighchartDataChange}
        /> */
    }

    {
      /* <ul>{seriesCol.map((item, i) => <li key={i}> {item.text}</li>)}</ul> */
    }

    {
      /* <TablePreview
          checkbox
          className={"table table-bordered"}
          maxRow={null}
          maxCol={null}
          rows={series.rows}
          cols={series.cols}
        /> */
    }

    return (
      <div>
        <Card initiallyExpanded style={{ marginBottom: "25px" }}>
          <CardHeader
            title="Data"
            subtitle=""
            actAsExpander={true}
            showExpandableButton={true}
            style={{ background: "rgba(0, 0, 0, 0.1)" }}
          />
          <CardText expandable={true}>
            <div className="row">
              <div className="col">
                <DataSetPicker
                  datasetChange={this.handleChange}
                  tableObj={tableObj}
                  mappedObj={mappedObj}
                  responses={responses}
                  dataSet={dataSet}
                  seriesCol={seriesCol}
                />
              </div>
            </div>
          </CardText>
        </Card>

        {outputAdvance ? (
          <textarea
            style={{ height: "500px", width: "100%" }}
            name="type"
            value={pretty}
            onChange={this.handleHighchartDataChange}
          />
        ) : null}
      </div>
    );
  }
}

class DataSetPicker extends React.Component {
  render() {
    const responses = this.props.responses;
    const tableObj = this.props.tableObj;
    const mappedObj = this.props.mappedObj;
    const dataSet = this.props.dataSet;
    const seriesCol = this.props.seriesCol;

    return (
      <div>
        <SelectField
          floatingLabelText="Sample Data"
          value={dataSet.UID}
          onChange={this.props.datasetChange}
          maxHeight={200}
        >
          {responses.map(
            (item, i) =>
              item.Columns && (
                <MenuItem value={item.UID} key={i} primaryText={item.name} />
              )
          )}
        </SelectField>

        {seriesCol.length === 0 && <p>No parameters</p>}

        {seriesCol.length > 0 && (
          <div>
            <div>
              <p>
                Parameters ({mappedObj.notMapped.length} / {seriesCol.length})
              </p>

              <Container
                name={"notmapped"}
                id={1}
                table={tableObj}
                items={mappedObj.notMapped}
                boardstyle={{ minHeight: "100px" }}
                cardstyle={{ display: "inline-block" }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

class FormFieldChart extends React.Component {
  constructor(props) {
    super(props);
    this.handleHighchartDataChange = this.handleHighchartDataChange.bind(this);
  }

  handleHighchartDataChange(e) {
    const target = e.target;
    const targetValue = target.value;
    const name = target.name;

    if (name === "type") {
      const raw = JSON.parse(target.value);
      this.props.handleHighchartDataChange(e, raw);
    } else {
      const o = this.props.options;
      const path = target.getAttribute("path");

      if (path) {
        const pathSplit = path.split(".");

        const newProp = { ...o[pathSplit[0]], [pathSplit[1]]: targetValue };
        o[pathSplit[0]] = newProp;

        this.props.handleHighchartDataChange(e, o);
      }
    }

    // handleChange = (value) => {
    //   const newState = {...this.state.type, flag: value}
    //   this.setState({ type: newState })
    // }
  }

  render() {
    const props = this.props.st;
    const o = this.props.options;

    const tileTypeVal = props.tileType;

    const tableObj = props.type.table
      ? props.type.table
      : defaultTableConfig.table;
    const tblclassName = tableObj.className;

    const dataSet = props.dataSet;
    const series = GetHighchartSeries(dataSet.UID);
    const mappedObj = GetMappedObject(series, tableObj.columns);

    return (
      <div>
        <Toggle
          name="enable"
          label="Enable"
          labelStyle={{ fontWeight: "unset" }}
          toggled={props.enable}
          style={styles.toggle}
          value={props.enable}
          onToggle={this.props.handleChange}
        />

        <TextField
          name="name"
          hintText="Name"
          floatingLabelText="Name"
          fullWidth={true}
          value={props.name}
          onChange={this.props.handleChange}
        />
        <TextField
          name="description"
          hintText="Description"
          floatingLabelText="Description"
          fullWidth={true}
          value={props.description}
          onChange={this.props.handleChange}
        />

        {o.chart && o.chart.type === "table" ? null : (
          /*{ <TableConfig
            st={this.props.st}
            options={o}
            table={tableObj}
            handleUpdateInput={this.props.handleUpdateInput}
            handleOtherChartDataChange={this.props.handleOtherChartDataChange}
          /> }*/
          <div>
            <TextField
              name="text"
              hintText="Title"
              floatingLabelText="Title"
              fullWidth={true}
              value={o.title && o.title.text ? o.title.text : ""}
              path={"title.text"}
              onChange={this.handleHighchartDataChange}
            />
            <TextField
              name="text"
              hintText="Subtitle"
              floatingLabelText="Subtitle"
              fullWidth={true}
              value={o.subtitle && o.subtitle.text ? o.subtitle.text : ""}
              path={"subtitle.text"}
              onChange={this.handleHighchartDataChange}
            />
          </div>
        )}

        <ChartTypeSelector
          options={o}
          handleOtherChartDataChange={this.props.handleOtherChartDataChange}
          handleHighchartDataChange={this.props.handleHighchartDataChange}
          chart={o.chart}
        />

        {o.chart && o.chart.type === "text" ? (
          <TextConfig
            options={o}
            handleOtherChartDataChange={this.props.handleOtherChartDataChange}
          />
        ) : null}

        <AutoCompleteControlled
          value={props.refreshRate}
          name="refreshRate"
          floatingLabelText="Refresh rate"
          fullWidth={true}
          dataSource={refreshRates}
          dataSourceConfig={{ text: "text", value: "value" }}
          handleUpdateInput={this.props.handleUpdateInput}
        />
      </div>
    );
  }
}

class FormFieldFilter extends React.Component {
  render() {
    const props = this.props.st;

    return (
      <div>
        <Toggle
          name="enable"
          label="enable"
          labelStyle={{ fontWeight: "unset" }}
        />

        <TextField
          name="filter"
          hintText="filter"
          floatingLabelText="filter"
          fullWidth={true}
        />
      </div>
    );
  }
}

class FormFieldStyle extends React.Component {
  render() {
    const props = this.props.st;

    return (
      <div>
        <TextField
          name="style"
          hintText="style"
          floatingLabelText="style"
          fullWidth={true}
        />
      </div>
    );
  }
}

class FormFieldAlert extends React.Component {
  render() {
    const props = this.props.st;

    return (
      <div>
        <TextField
          name="alert"
          hintText="alert"
          floatingLabelText="alert"
          fullWidth={true}
        />
      </div>
    );
  }
}
export {
  FormFieldData,
  FormFieldChart,
  FormFieldFilter,
  FormFieldStyle,
  FormFieldAlert
};
