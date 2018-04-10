import React, { Component } from "react";
import ReactDOM from "react-dom";

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
  RaisedButton,
  Switch
} from "material-ui";

const buttonStyle = {
  marginBottom: 10,
  width: "100%"
};

// styling
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import { muiTheme } from "../dialog/Mui/muiTheme";

//import GridLocalStorage from "../react-grid-layout/react-grid-layout-noCompacting";
//import GridLocalStorage from "../react-grid-layout/demos/7-localstorage";
import GridLocalStorage from "../react-grid-layout/demos/ReactGridLayoutBuilderDemo";

import {
  generateUUID,
  getFullScreenDialogStyle,
  refreshRates,
  names,
  tileType
} from "../data/data";

const styles = {
  block: {
    maxWidth: 250
  },
  radioButton: {
    marginBottom: 16
  },
  menuItemWidth: {
    width: 200
  },
  toggle: {
    marginTop: 16,
    marginBottom: 16
  }
};

export default class MyForm extends React.Component {
  defaultState = {
    name: "",
    description: "",
    cols: 12,
    enable: true
  };

  constructor(props) {
    super(props);
    this.state = Object.assign(this.defaultState, this.props.data);
    this.handleClose = this._handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);

    // this._handleChangeSelect = this._handleChangeSelect.bind(this);
    // this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  componentDidMount() {
    if (this.props.data) {
      this.setState({
        ...this.state,
        layouts: undefined,
        layoutMap: undefined
      });
    }
  }

  //https://github.com/tleunen/react-mdl/issues/1
  // componentDidMount(){
  //   let elt = React.findDOMnode(this);
  //   let ch = componentHandler.upgradeElement(elt);
  // }
  // componentWillUnmount(){
  //            const elt = findDOMNode(this);
  //    ch.downgradeElement(elt);
  // }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  componentDidMount() {
    this.initMDLComponents();
  }

  initMDLComponents() {
    const tmpl = document.querySelector("#checkbox123");
    const that = this;
    let mdlUpgradedDom = false;
    let children = React.Children.toArray(this.props.children);
    const myInterv = setInterval(
      function() {
        if (!mdlUpgradedDom) {
          console.log("upgrading MDL");
          // componentHandler.upgradeElement(tmpl);
          componentHandler.upgradeDom();

          mdlUpgradedDom = true;
        }
      },
      20,
      that,
      tmpl
    );
    if (mdlUpgradedDom) {
      clearTimeout(myInterv);
    }
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  componentWillUnmount() {
    // clean up the mess
  }

  handleReset() {}

  // _handleChangeSelect(event, index, value) {
  //   const name = this._searchFilter.props.name;
  //   this.setState({
  //     [name]: value
  //   });
  //   console.log(this.state);
  // }

  // handleUpdateInput(name, value) {
  //   this.setState({
  //     [name]: value
  //   });
  //   console.log(this.state);
  // }

  handleChange(event, isInputChecked) {
    const target = event.target;
    //  https://stackoverflow.com/questions/28478945/react-js-cant-change-checkbox-state
    let value = target.type === "checkbox" ? isInputChecked : target.value;
    const name = target.name;

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

  handleSubmit(event) {
    event.preventDefault();
    const copy = Object.assign({}, this.state);
    const gridLayoutPlugin = this.gridLayoutPlugin.state;

    copy.layouts = gridLayoutPlugin.layouts;
    copy.layoutMap = gridLayoutPlugin.layoutMap;

    this.props.onAddClick(copy);
    this.handleClose();
  }

  getlayout(items) {
    console.log(items);
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

    let customContentStyle;
    let bodyStyle;
    if (this.props.fullscreen) {
      const objStyle = getFullScreenDialogStyle();
      customContentStyle = objStyle.customContentStyle;
      bodyStyle = objStyle.bodyStyle;
    }

    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <MuiThemeProvider>
        <div>
          <Dialog
            title={props.title + " Dashboard" || "Add Dashboard"}
            autoScrollBodyContent={true}
            modal={false}
            open={props.open}
            actions={actions}
            onRequestClose={this.handleClose}
            contentStyle={customContentStyle}
            bodyStyle={bodyStyle}
          >
            <div className="">
              <div className="row">
                <div
                  className="col-sm-3 col-md-2 d-none d-sm-block"
                  style={{}}
                >
                  <form
                    onSubmit={e => {
                      this.handleSubmit(e);
                    }}
                  >
                    <TextField
                      name="name"
                      value={this.state.name}
                      hintText="Name"
                      floatingLabelText="Name"
                      fullWidth={true}
                      onChange={this.handleChange}
                    />

                    <br />
                    <TextField
                      name="description"
                      value={this.state.description}
                      hintText="Description"
                      floatingLabelText="Description"
                      fullWidth={true}
                      onChange={this.handleChange}
                    />

                    <Toggle
                      name="enable"
                      label="Enable"
                      labelStyle={{ fontWeight: "unset" }}
                      toggled={this.state.enable}
                      style={styles.toggle}
                      value={this.state.enable}
                      onToggle={this.handleChange}
                    />
                  </form>
                </div>

                <div
                  id="grid-content"
                  className="col-sm-9 ml-sm-auto col-md-10"
                  style={{ padding: "0" }}
                >
                  <div id="content1" />

                  <GridLocalStorage
                    ref={c => (this.gridLayoutPlugin = c)}
                    layouts={this.props.data ? this.props.data.layouts : {}}
                    layoutMap={this.props.data ? this.props.data.layoutMap : []}
                  />
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}
