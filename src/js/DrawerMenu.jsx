import React from "react";

//import SelectableMenuList from "./dialog/Mui/Menu";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { muiTheme } from "./dialog/Mui/muiTheme";

import FontIcon from "material-ui/FontIcon";
import Dashboard from "material-ui/svg-icons/action/dashboard";
import logo from "../img/AvatarBackground2.jpg";

const styles = {
  headline: {
    fontSize: 10,
    paddingTop: 0,
    marginBottom: 0,
    fontWeight: 300
  }
};

export default class DrawerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {}

  componentDidMount() {
   
  }

  render() {
    const list = this.props.list;

    const tabs = [
      {
        label: "Pages",
       // app: () => <SelectableMenuList items={list} />
      }
    ];

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <img
            style={{
              width: "100%",
              height: "76px"
            }}
            src={logo}
            alt="Cloud Recording"
          />

          {tabs.map((tab, index) => <div key={index}>{tab.app()}</div>)}


        </div>
      </MuiThemeProvider>
    );
  }
}
