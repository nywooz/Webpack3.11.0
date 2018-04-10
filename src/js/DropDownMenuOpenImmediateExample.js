import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {cyan500} from 'material-ui/styles/colors';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



const styles = {
  customWidth: {
    width: 200,
  },
};

export default class DropDownMenuOpenImmediateExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: 2 };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() { }

  componentWillUnmount() { }

  handleChange(event, index, value) { this.setState({ value }); }

  render() {
    return (
      <MuiThemeProvider  muiTheme={getMuiTheme(lightBaseTheme)}>
        <DropDownMenu
          style={ styles.customWidth}  
          value={this.state.value}
          onChange={this.handleChange}
          openImmediately={false}>
          <MenuItem
            value={1}
            primaryText="Ready" />
          <MenuItem
            value={2}
            primaryText="Not ready" />
          <MenuItem
            value={3}
            primaryText="Lunch" />
        </DropDownMenu>
      </MuiThemeProvider>

    );
  }
}