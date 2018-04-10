import React from 'react';
import ReactDOM from 'react-dom';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import muiThemeable from 'material-ui/styles/muiThemeable';
import { muiTheme } from '../dialog/Mui/muiTheme';
import FlatButton from 'material-ui/FlatButton';

import Drawer from 'material-ui/Drawer';


export default class BurgerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleLeftTouchTap = this.handleLeftTouchTap.bind(this);
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  handleLeftTouchTap() {
    this.handleToggle()

  }

  handleTouchTap() {
    alert('onClick triggered on the title component');
  }


  componentDidMount() { }

  componentWillUnmount() { }

  render() {
    // const { buyItems, message } = this.state;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            style={{ position: 'fixed' }}
            onLeftIconButtonTouchTap={this.handleLeftTouchTap}
            title="My custom theme"
            onTitleTouchTap={this.handleTouchTap}
            iconElementRight={<FlatButton label="Save" />}
          />
          
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          />

        </div>
      </MuiThemeProvider>
    )
  }
}
