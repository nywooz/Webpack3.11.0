import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  MuiThemeProvider,
  getMuiTheme,
  // Dialog,
  // FlatButton,
  // MenuItem,
  TextField,
  // TimePicker,
  // DatePicker,
  // SelectField,
  Checkbox,
  Toggle
  // Slider,
  // RadioButtonGroup,
  // RadioButton,
  // DropDownMenu,
  // Switch
} from "material-ui";

import { styles } from "../dialog/Mui/styles";

import AutoCompleteControlled from "../dialog/Mui/AutoCompleteControlled";

import { tblClassNames } from "../data/data";

export class TilePreviewer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.options.chart.type === "text" ? (
          <TextPreviewer options={this.props.options} st={this.props.st} />
        ) : null}

        {this.props.options.chart.type === "table" ? (
          <TablePreviewer
            handleUpdateInput={this.props.handleUpdateInput}
            handleHighchartDataSetChange={
              this.props.handleHighchartDataSetChange
            }
            handleOtherChartDataChange={this.props.handleOtherChartDataChange}
            options={this.props.options}
            st={this.props.st}
          />
        ) : null}
      </div>
    );
  }
}

class TextPreviewer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const o = this.props.options;
    const content =
      o.content && o.content.text ? o.content.text : "Text Previewer";
    const footer = o.credits && o.credits.text ? o.credits.text : "Footer";

    const title = o.title && o.title.text ? o.title.text : "Title";
    const subtitle =
      o.subtitle && o.subtitle.text ? o.subtitle.text : "Subtitle";

    return (
      <div>
        <div>{title}</div>
        <div>{subtitle}</div>
        <div>{content}</div>
        <div>{footer}</div>
      </div>
    );
  }
}

export class TextConfig extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, v) {
    const o = this.props.options;
    let newProp = {};
    const text = { text: v };
    newProp = { ...o, [e.target.name]: text };

    this.props.handleOtherChartDataChange
      ? this.props.handleOtherChartDataChange(e, newProp)
      : null;
  }

  render() {
    const o = this.props.options;
    return (
      <div>
        <TextField
          name="content"
          fullWidth={true}
          value={o.content && o.content.text ? o.content.text : ""}
          floatingLabelText="Content"
          onChange={this.handleChange}
          hintText="Content"
        />
        <TextField
          name="credits"
          fullWidth={true}
          value={o.credits && o.credits.text ? o.credits.text : ""}
          floatingLabelText="Footer"
          onChange={this.handleChange}
          hintText="Footer"
        />
      </div>
    );
  }
}

function InputCheckbox(props) {
  return (
    <Checkbox
      label={props && props.label}
      aria-label="Checkbox for following text input"
      style={styles.checkbox}
    />
  );
}

export class TablePreview extends React.Component {
  render() {
    const st = this.props.st;
    const cols = this.props.cols;
    const rows = this.props.rows;
    // preview limit

    const maxCol = this.props.maxCol !== undefined ? this.props.maxCol : 3;
    const maxRow = this.props.maxRow !== undefined ? this.props.maxRow : 3;

    return (
      <div style={{ maxWidth: "100%", overflow: "auto" }}>
        <table
          id={this.props.id}
          className={"table-bordered " + this.props.className}
        >
          <thead>
            <tr>
              <th scope="col" key={"select"}>
                {this.props.checkbox && <InputCheckbox />}
              </th>
              {cols.map((item, index) => {
                if (maxCol) {
                  return maxCol && index < maxCol ? (
                    <th scope="col" key={index}>
                      {item.text}
                    </th>
                  ) : null;
                } else {
                  return (
                    <th scope="col" key={index}>
                      {item.text}
                    </th>
                  );
                }
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => {
              if (maxRow) {
                return maxRow && index < maxRow ? (
                  <tr scope="row" key={index}>
                    <td scope="col" key={"select"}>
                      {this.props.checkbox && <InputCheckbox />}
                    </td>
                    {item &&
                      item.map((itemData, itemIndex) => {
                        return maxCol && itemIndex < maxCol ? (
                          <td scope="col" key={itemIndex}>
                            {itemData}
                          </td>
                        ) : null;
                      })}
                  </tr>
                ) : null;
              } else {
                return (
                  <tr scope="row" key={index}>
                    <td scope="col" key={"select"}>
                      {this.props.checkbox && <InputCheckbox />}
                    </td>
                    {item &&
                      item.map((itemData, itemIndex) => {
                        return (
                          <td scope="col" key={itemIndex}>
                            {itemData}
                          </td>
                        );
                      })}
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

import { GetHighchartSeries, GetMappedObject } from "../form/Tile";
export const defaultTableConfig = {
  chart: {
    type: "table"
  },
  table: {
    style: "",
    id: "",
    className: "",
    searchable: true,
    paging: 10,
    hscrollbar: false,
    vscrollbar: true,
    columns: [
      {
        style: "",
        sortable: true,
        title: "Column header",
        datasource: {
          columnName: ""
        }
      }
    ]
  }
};

import Container from "../React DnD/Container";

class TablePreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.mappedChanged = this.mappedChanged.bind(this);
  }

  setMappedObject(draggables) {
    const preferredSchemaCols = this.props.st.type.table.columns;

    const requestedTableSchema = draggables.map((item, index) => {
      return {
        style: item.style,
        sortable: item.sortable,
        title: item.text,
        horizontalAlign: item.horizontalAlign,
        width: item.width,
        widthUnit: item.widthUnit,
        visible: item.visible,
        datasource: { columnName: item.text }
      };
    });

    console.log(requestedTableSchema);
  }

  mappedChanged(v) {
    this.setMappedObject(v);
  }

  handleCardChange(draggables) {
    this.setMappedObject(draggables);
  }

  render() {
    const o = this.props.options;
    const title = o.title && o.title.text ? o.title.text : "";
    const subtitle = o.subtitle && o.subtitle.text ? o.subtitle.text : "";
    const footer = o.credits && o.credits.text ? o.credits.text : "";

    const tableObj = o.table ? o.table : defaultTableConfig.table;
    const tblclassName = tableObj.className;

    const series = GetHighchartSeries(this.props.st.dataSet.UID);
    const rows = series.rows;
    const cols = series.cols;

    const mappedObj = GetMappedObject(series, tableObj.columns);

    return (
      <div>
        <Card initiallyExpanded style={{ marginBottom: "25px" }}>
          <CardHeader
            title="Mapped Columns"
            subtitle="Display order"
            actAsExpander={true}
            showExpandableButton={true}
            style={{ background: "rgba(0, 0, 0, 0.1)" }}
          />
          <CardText expandable={true}>
            <Container
              handleCardChange={this.handleCardChange.bind(this)}
              onLayoutChange={this.mappedChanged}
              id={2}
              table={tableObj}
              items={mappedObj.mapped}
              name={"mapped"}
              boardstyle={{ minHeight: "100px" }}
              cardstyle={{ display: "inline-block" }}
            />
          </CardText>
        </Card>

        <Card initiallyExpanded style={{ marginBottom: "25px" }}>
          <CardHeader
            title="Sort"
            subtitle=""
            actAsExpander={true}
            showExpandableButton={true}
            style={{ background: "rgba(0, 0, 0, 0.1)" }}
          />
          <CardText expandable={true}>
            <Container
              handleCardChange={this.handleCardChange.bind(this)}
              onLayoutChange={this.mappedChanged}
              id={3}
              table={tableObj}
              items={mappedObj.mapped}
              name={"mapped"}
              boardstyle={{ minHeight: "100px" }}
              cardstyle={{ display: "inline-block" }}
            />
          </CardText>
        </Card>

        <TableConfig
          st={this.props.st}
          options={o}
          table={tableObj}
          handleUpdateInput={this.props.handleUpdateInput}
          handleOtherChartDataChange={this.props.handleOtherChartDataChange}
        />

        <div>{title}</div>
        <div>{subtitle}</div>
        <h1 style={{ textAlign: "center", color: "rgba(0, 0, 0, 0.3)" }}>
          Table preview is not available yet
        </h1>

        <div>{footer}</div>
      </div>
    );

    return (
      <div>
        <Card initiallyExpanded style={{ marginBottom: "25px" }}>
          <CardHeader
            title="Mapped Columns"
            subtitle="Display order"
            actAsExpander={true}
            showExpandableButton={true}
            style={{ background: "rgba(0, 0, 0, 0.1)" }}
          />
          <CardText expandable={true}>
            <Container
              onLayoutChange={this.mappedChanged}
              id={2}
              table={tableObj}
              items={mappedObj.mapped}
              name={"mapped"}
              style={{ display: "inline-block" }}
            />
          </CardText>
        </Card>

        <p />

        <div>{title}</div>
        <div>{subtitle}</div>
        <h5>Table preview with sample data</h5>
        <TablePreview
          id={tableObj.id ? tableObj.id : ""}
          className={"table " + tblclassName}
          st={this.props.st}
          rows={rows}
          cols={mappedObj.mapped}
        />

        <div>{footer}</div>
      </div>
    );
  }
}

export class TableConfig extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCustomTableProp = this.handleChangeCustomTableProp.bind(
      this
    );
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

  handleUpdateInput(name, text, value) {
    this.handleChangeNameValuePair(null, name, value);
  }

  handleChangeNameValuePair(e, name, value) {
    const props = this.props;
    const newProp = {
      ...{},
      table: { ...props.table, [name]: value },
      chart: props.options.chart
    };

    // const modifiedProp = { ...props.table, [name]: value };
    // const newProp = { ...props, table: modifiedProp };

    this.props.handleOtherChartDataChange
      ? this.props.handleOtherChartDataChange(e, newProp)
      : null;
  }

  handleChange(e, v) {
    const target = e.target;
    //  https://stackoverflow.com/questions/28478945/react-js-cant-change-checkbox-state
    let value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (typeof value === "string") {
      if (value === "true") {
        value = true;
      } else if (value === "false") {
        value = false;
      }
    }
    this.handleChangeNameValuePair(e, name, value);
  }

  handleChangeCustomTableProp(e, v) {
    const target = e.target;
    //  https://stackoverflow.com/questions/28478945/react-js-cant-change-checkbox-state
    let value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (typeof value === "string") {
      if (value === "true") {
        value = true;
      } else if (value === "false") {
        value = false;
      }
    }
    const path = target.getAttribute("path");

    if (path) {
      const o = this.props.st;

      const pathSplit = path.split(".");

      const newProp = { ...o[pathSplit[0]], [pathSplit[1]]: value };
      o[pathSplit[0]] = newProp;

      this.props.handleUpdateInput(pathSplit[0], o[pathSplit[0]]);
    }
  }

  render() {
    const props = this.props;
    const tableObj = props.table;
    const tblclassName = tableObj.className;

    const o = this.props.st;

    return (
      <Card style={{ marginBottom: "25px" }}>
        <CardHeader
          title="Table Properties"
          subtitle=""
          actAsExpander={true}
          showExpandableButton={true}
          style={{ background: "rgba(0, 0, 0, 0.1)" }}
        />
        <CardText expandable={true}>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-12">
                  <TextField
                    fullWidth
                    name={"id"}
                    value={tableObj.id}
                    hintText={"ID"}
                    floatingLabelText={"ID"}
                    onChange={this.handleChange}
                  />

                  <TextField
                    fullWidth
                    name={"className"}
                    value={tableObj.className}
                    hintText={
                      "table-dark table-striped table-bordered table-hover"
                    }
                    floatingLabelText={"Table CSS ClassNames"}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="col-6 vert-line">
              <Toggle
                name="searchable"
                label="Searchable"
                labelStyle={{ fontWeight: "unset" }}
                toggled={tableObj.searchable}
                style={styles.toggle}
                value={tableObj.searchable}
                onToggle={this.handleChange}
              />

              <Toggle
                name="hscrollbar"
                label="Horizontal Scrollbar"
                labelStyle={{ fontWeight: "unset" }}
                toggled={tableObj.hscrollbar}
                style={styles.toggle}
                value={tableObj.hscrollbar}
                onToggle={this.handleChange}
              />

              <Toggle
                name="vscrollbar"
                label="Vertical Scrollbar"
                labelStyle={{ fontWeight: "unset" }}
                toggled={tableObj.vscrollbar}
                style={styles.toggle}
                value={tableObj.vscrollbar}
                onToggle={this.handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField
                name="header"
                hintText="Header"
                floatingLabelText="Header"
                fullWidth={true}
                value={o.header && o.header.title ? o.header.title : ""}
                path={"header.title"}
                onChange={this.handleChangeCustomTableProp}
              />
              <TextField
                name="headerclass"
                hintText="Header class"
                floatingLabelText="Header class"
                fullWidth={true}
                value={o.header && o.header.class ? o.header.class : ""}
                path={"header.class"}
                onChange={this.handleChangeCustomTableProp}
              />

              <TextField
                name="footer"
                hintText="Footer"
                floatingLabelText="Footer"
                fullWidth={true}
                value={o.footer && o.footer.title ? o.footer.title : ""}
                path={"footer.title"}
                onChange={this.handleChangeCustomTableProp}
              />

              <TextField
                name="footerclass"
                hintText="Footer class"
                floatingLabelText="Footer class"
                fullWidth={true}
                value={o.footer && o.footer.class ? o.footer.class : ""}
                path={"footer.class"}
                onChange={this.handleChangeCustomTableProp}
              />

              <TextField
                fullWidth
                name={"paging"}
                value={tableObj.paging}
                hintText={"Paging"}
                floatingLabelText={"Paging"}
                type="number"
                min={1}
                max={10}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <p>Add Column</p>
            </div>

            <div className="col">
              <p>Add row</p>
            </div>
            <div className="col">
              <p>Remove Column</p>
            </div>
            <div className="col">
              <p>Remove row</p>
            </div>
          </div>
        </CardText>
      </Card>
    );
  }
}

import { Card, CardHeader, CardText } from "material-ui/Card";
