import React from 'react';
import ReactDOM from 'react-dom';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

// styling
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { muiTheme } from '../dialog/Mui/muiTheme';

import TileForm from '../dialog/Tile';

const styles = {
  radioButton: {
    marginTop: 16,
  },
};

/**
 * Dialog content can be scrollable.
 */
export default class DialogExampleScrollable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      fromChild: '',
    };

    typeof props.open === "boolean" ? this.state.open = props.open : this.state.open = false;

    this.handleData = this.handleData.bind(this);

    this.saveFormRef = this.saveFormRef.bind(this);


  }

  componentDidMount() {
    this.props.data;
  }

  componentWillUnmount() {
    // clean up the mess
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    ReactDOM.unmountComponentAtNode(this.props.modal_root);
  };

  handleData(event, data) {
    this.setState({
      fromChild: data
    });
    console.log(data);
  }

  saveFormRef = (form) => {
    if (form && !this.fromChild) {
      this.fromChild = form;
    }


  }

  render() {
    const { props } = this;


    const actions = [
      <FlatButton
        type="reset"
        label="Reset"
        secondary={true}
        style={{ float: 'left' }}
      />,

      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,

      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <MuiThemeProvider>
        <div>
          <Dialog
            title={props.title || ""}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
            actions={actions}
          >

            <TileForm
              ref={this.saveFormRef}

              handlerFromParent={this.handleData}

            />

          </Dialog>
        </div>
      </MuiThemeProvider>

    );
  }
}

