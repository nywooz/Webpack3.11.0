import React from "react";
import ReactDOM from "react-dom";

import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";

import Form, {
  MuiThemeProvider,
  getMuiTheme,
  Dialog,
  FlatButton,
  Menu,
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
  Switch
} from "material-ui";

import { Card, CardHeader, CardText } from "material-ui/Card";
import SearchIcon from "material-ui/svg-icons/action/search";

export default class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: this.props.searchTerm || "",
      templates: this.props.templates || [],
      selected: this.props.selected || []
    };

    this._handleUserInput = this._handleUserInput.bind(this);
  }

  _handleUserInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    return (
      <div>
        <SearchBox
          filterText={this.state.filterText}
          handleUserInput={this._handleUserInput}
          templateCount={this.state.templates.length}
        />
        <TemplateList
          itemSelected={this.props.itemSelected}
          gridItem_i={this.props.gridItem_i}
          i={this.props.i}
          exclude={this.props.exclude}
          filterText={this.state.filterText}
          templateList={this.state.templates}
        />
      </div>
    );
  }
}

class SearchBox extends React.Component {
  constructor() {
    super();
    this.handleSearchFilterChange = this.handleSearchFilterChange.bind(this);
  }

  componentDidMount() {
    this._searchFilter.focus();
  }

  handleSearchFilterChange(e, value) {
    this.props.handleUserInput(value);
  }

  render() {
    let placeholder = "" + this.props.templateCount + " results found ...";
    return (
      <div>
        <div
          style={{
            position: "relative",
            display: "inline-block",
            width: "100%"
          }}
        >
          <SearchIcon
            style={{
              position: "absolute",
              right: 0,
              top: 40,
              width: 20,
              height: 20
            }}
          />
          <TextField
            autoFocus
            autoComplete="off"
            name="searchable"
            type="text"
            ref={c => (this._searchFilter = c)}
            value={this.props.filterText}
            name="name"
            hintText="Search by Name"
            floatingLabelText="Search by Name"
            onChange={_.debounce(
              (event, value) => this.handleSearchFilterChange(event, value),
              100
            )}
            fullWidth={true}
          />
        </div>
      </div>
    );
  }
}

const styles = {
  listWrapper: {
    display: "flex",
    flexWrap: "wrap"
  },
  list: {
    width: "100%"
  },
  subheader: {},
  listItem: {
    padding: 0
  }
};
class TemplateList extends React.Component {
  render() {
    let templateList = this.props.templateList.map((item, index) => {
      return (
        <div key={index + "." + item.name} style={styles.listWrapper}>
          <List style={styles.list}>
            <Subheader style={styles.subheader}>{item.name}</Subheader>
            <TemplateListContent
              itemSelected={this.props.itemSelected}
              key={item.name + index}
              filterText={this.props.filterText}
              exclude={this.props.exclude}
              gridItem_i={this.props.gridItem_i}
              i={this.props.i}
              items={item.data}
              module={item.module}
            />
            <Divider />
          </List>
        </div>
      );
    }, this);

    return <div className="">{templateList}</div>;
  }
}

class TemplateListContent extends React.Component {
  handleClick() {
    console.log(this);
  }

  render() {
    const items = this.props.items || [];
    const exclude = this.props.exclude || [];

    let templateList = items.map(
      (item, index) => {
        let lc = this.props.filterText.toLowerCase();

        if (
          item.name.toLowerCase().indexOf(lc) === -1 &&
          (item.description === null ||
            item.description.toLowerCase().indexOf(lc) === -1)
        ) {
          return;
        }

        const mapIndx = exclude.findIndex(mapItem => mapItem.UID === item.UID);
        if (mapIndx !== -1) {
          return;
          //already used
        }

        return (
          <ListItem
            onClick={() =>
              this.props.itemSelected({
                UID: item.UID,
                module: this.props.module,
                gridItem_i: this.props.gridItem_i,
                i: this.props.i
              })
            }
            style={styles.listItem}
            key={item.UID}
            primaryText={item.name}
            secondaryText={item.description}
          />
        );
      },
      this,
      exclude
    );

    // const matchesFound = templateList.map((item, index) => {
    //   return item !== undefined;
    // });

    // if (matchesFound.indexOf(false) === -1) {
    //   debugger;
    // }

    return <div>{templateList}</div>;
  }
}
