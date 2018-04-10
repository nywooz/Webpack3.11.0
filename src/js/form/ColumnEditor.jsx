import React, { Component } from "react";
import ReactDOM from "react-dom";

import Form, {
  MuiThemeProvider,
  getMuiTheme,
  Dialog,
  FlatButton,
  MenuItem,
  TextField,
  // TimePicker,
  // DatePicker,
  SelectField,
  Checkbox,
  Toggle
  // Slider,
  // RadioButtonGroup,
  // RadioButton,
  // DropDownMenu,
  // Switch
} from "material-ui";
import CenterIcon from "material-ui/svg-icons/editor/format-align-center";
import LeftIcon from "material-ui/svg-icons/editor/format-align-left";
import RightIcon from "material-ui/svg-icons/editor/format-align-right";

// styling
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import { muiTheme } from "../dialog/Mui/muiTheme";

import Listing from "../octoComponents/Listing";
import { styles } from "../dialog/Mui/styles";

export default class ColumnEditor extends React.Component {
  defaultState = {
    text: "",
    title: "",
    horizontalAlign: "center",
    width: "100",
    widthUnit: "%",
    sortable: false,
    style: "",
    visible: true
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

  handleSelectedAlignChange(e, key, value) {
    this.handleChangeNameValuePair(e, "horizontalAlign", value);
  }
  handleSelectedUnit(e, key, value) {
    this.handleChangeNameValuePair(e, "widthUnit", value);
  }

  handleChangeNameValuePair(e, name, value) {
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
    this.handleChangeNameValuePair(event, name, value);
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

    const actions = [
      <FlatButton
        key="1"
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,

      <FlatButton
        key="3"
        type="submit"
        label="OK"
        keyboardFocused={true}
        primary={true}
        onClick={e => {
          this.handleSubmit(e);
        }}
      />
    ];

    const customContentStyle = {
      width: "30%",
      maxWidth: "none"
    };

    const disabled = !this.state.visible;

    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <MuiThemeProvider>
        <div>
          <Dialog
            contentStyle={customContentStyle}
            autoScrollBodyContent={true}
            modal={props.modal}
            open={props.open}
            actions={actions}
            modal={false}
            onRequestClose={this.handleClose}
          >
            <form
              onSubmit={e => {
                this.handleSubmit(e);
              }}
            >
              <TextField
                hintText="Column Name"
                floatingLabelText="Column Name"
                value={this.state.text}
                fullWidth={true}
                disabled={true}
              />

              <Toggle
                label="Visible"
                style={styles.style}
                name="visible"
                value={this.state.visible}
                toggled={this.state.visible}
                onToggle={this.handleChange.bind(this)}
              />

              <TextField
                hintText="Title"
                floatingLabelText="Title"
                fullWidth={true}
                name="title"
                value={this.state.title}
                onChange={this.handleChange.bind(this)}
                disabled={disabled}
              />

              <SelectField
                disabled={disabled}
                floatingLabelText="Horizontal Alignment"
                fullWidth={true}
                name="horizontalAlign"
                value={this.state.horizontalAlign}
                onChange={this.handleSelectedAlignChange.bind(this)}
              >
                <MenuItem
                  value={"left"}
                  rightIcon={<LeftIcon />}
                  primaryText="Left"
                />
                <MenuItem
                  value={"center"}
                  rightIcon={<CenterIcon />}
                  primaryText="Center"
                />
                <MenuItem
                  value={"right"}
                  rightIcon={<RightIcon />}
                  primaryText="Right"
                />
              </SelectField>

              <TextField
                disabled={disabled}
                hintText="Width"
                floatingLabelText="Width"
                name="width"
                type="number"
                value={this.state.width}
                onChange={this.handleChange.bind(this)}
                style={{ width: "80%" }}
              />

              <SelectField
                disabled={disabled}
                floatingLabelText="Unit"
                name="widthUnit"
                value={this.state.widthUnit}
                onChange={this.handleSelectedUnit.bind(this)}
                style={{ width: "20%", top: 14 }}
              >
                <MenuItem value={"%"} primaryText="%" />
                <MenuItem value={"px"} primaryText="px" />
              </SelectField>

              <Toggle
                disabled={disabled}
                label="Sortable"
                style={styles.toggle}
                name="sortable"
                value={this.state.sortable}
                toggled={this.state.sortable}
                onToggle={this.handleChange.bind(this)}
              />

              <TextField
                disabled={disabled}
                hintText="Style"
                floatingLabelText="Style"
                name="style"
                value={this.state.style}
                onChange={this.handleChange.bind(this)}
              />
            </form>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

const formJSON = [
  {
    component: "Toggle",
    label: "Sort"
  },
  {}
];
