import React, { Component } from "react";
import ReactDOM from "react-dom";

import Form, { MuiThemeProvider, getMuiTheme, Dialog } from "material-ui";

// styling
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import { muiTheme } from "../dialog/Mui/muiTheme";

import Listing from "../octoComponents/Listing";

const styles = {
  block: {
    maxWidth: 250
  },
  radioButton: {
    marginBottom: 16
  },
  menuItemWidth: {
    width: 200
  }
};

export default class TileForm extends React.Component {
  defaultState = {
    filterText: "",
    templates: [],
  };

  constructor(props) {
    super(props);
    this.state = Object.assign(this.defaultState, this.props.data || {});

    this.handleClose = this._handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this._handleChangeSelect = this._handleChangeSelect.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.focusTextInput = this.focusTextInput.bind(this);
  }


  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    debugger;
    this.textInput.focus();
  }

  _handleChangeSelect(event, index, value) {
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

  handleChange(event) {
    const target = event.target;
    //  https://stackoverflow.com/questions/28478945/react-js-cant-change-checkbox-state
    let value = target.type === "checkbox" ? target.checked : target.value;

    if (typeof value === "string") {
      if (value === "true") {
        value = true;
      } else if (value === "false") {
        value = false;
      }
    }

    const name = target.name;

    this.setState({
      [name]: value
    });

    // var fields = { ...this.state }
    // fields[name] = value;
    // this.setState(fields);
    console.log(this.state);
  }

  itemSelected = obj => {
    this.props.itemSelected(obj);
    this._handleClose();
  };

  _handleClose() {
    this.setState({ open: false });
    ReactDOM.unmountComponentAtNode(this.props.modal_root);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddClick(this.state);

    console.log(this.state);
    // pass the input field value to the event handler passed
    // as a prop by the parent (App)
    this.handleClose();
  }

  render() {
    const { props } = this;
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <MuiThemeProvider>
        <div>
          <Dialog
            autoScrollBodyContent={true}
            modal={props.modal}
            open={props.open}
            onRequestClose={this.handleClose}
          >
            <form
              onSubmit={e => {
                this.handleSubmit(e);
              }}
            >
              <Listing
                itemSelected={this.itemSelected}
                exclude={props.data.exclude}
                gridItem_i={props.data.gridItem_i}
                i={props.data.i}
                templates={this.state.templates}
                filterText={this.state.filterText}
              />
            </form>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}
