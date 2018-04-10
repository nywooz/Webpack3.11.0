import React from "react";
import ReactDOM from "react-dom";

// MUI
// styling
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { muiTheme } from "../../dialog/Mui/muiTheme";

import {
  DropDownMenu,
  RaisedButton,
  SelectField,
  MenuItem,
  IconMenu,
  IconButton
} from "material-ui";

import AutoComplete from "../../dialog/Mui/AutoCompleteControlled";

const buttonStyle = {
  marginRight: 10
};

const iconStyles = {
  height: "20px",
  width: "20px",
  padding: "0 3px 3px 0"
};

const style = {
  paper: {
    // display: "inline-block",
    // float: "left",
    // margin: "16px 32px 16px 0"
  },
  rightIcon: {
    textAlign: "center",
    lineHeight: "24px"
  },
  customWidth: {
    width: 100
  }
};

import InsertChart from "material-ui/svg-icons/editor/show-chart";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import Close from "material-ui/svg-icons/navigation/close";
import Delete from "material-ui/svg-icons/action/delete";

import { red500, blue500 } from "material-ui/styles/colors";
// MUI

import { tileData, dashboardData ,dashboardTileMenu,MenuItems} from "../../data/data";


export default class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  activateMenu(i) {
    event.preventDefault();
    //const el = ReactDOM.findDOMNode(this._divItem);
    const txtSpan = this._divItem.querySelector(".text").textContent;
    console.log(txtSpan);
  }

  onItemClick(i, event, menuItem_obj) {
    const value = menuItem_obj.props.value;
    const txtSpan = this._divItem.querySelector(".text").textContent;
    console.log(txtSpan);
    if (this.props && this.props.onMenuItemSelected) {
      this.props.onMenuItemSelected(i, menuItem_obj);
    }
    // const txt = menuItem_obj.props.primaryText;
    // this._divItem.querySelector(".text").textContent = txt;
    // debugger;
  }

  render() {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };

    const items = this.props;
    const i = items.i;
    const l = items.l;

    let grid_className = "";
    if (l.static) { 
      grid_className = "static ";
    }
    if (this.props.className) {
      grid_className = grid_className.concat(
        grid_className,
        this.props.className
      );
    }

    return (
      <div
        key={i}
        data-grid={l}
        className={grid_className}
        style={this.props.style ? this.props.style : ""}
      >
        <div className="title-handle">
          <IconMenu
            style={style.paper}
            iconButtonElement={
              <IconButton className="" style={iconStyles} viewBox="0 0 20 20">
                <MoreVertIcon  />
              </IconButton>
            }
            anchorOrigin={{ horizontal: "left", vertical: "top" }}
            targetOrigin={{ horizontal: "left", vertical: "top" }}
            maxHeight={272}
          >
            {MenuItems(dashboardTileMenu)}
          </IconMenu>

          <button onClick={this.activateMenu.bind(this, i)} type="button">
            testDiv
          </button>

          <IconMenu
            style={style.paper}
            onItemClick={this.onItemClick.bind(this, i)}
            iconButtonElement={
              <IconButton className="" style={iconStyles} viewBox="0 0 20 20">
                <InsertChart  />
              </IconButton>
            }
            anchorOrigin={{ horizontal: "left", vertical: "top" }}
            targetOrigin={{ horizontal: "left", vertical: "top" }}
            maxHeight={272}
          >
            {MenuItems(tileData)}
          </IconMenu>

          <div>
            <span
              className="remove"
              style={removeStyle}
              onClick={this.props.onRemoveItem.bind(this, i)}
            >
              <Close
                style={iconStyles}
                hoverColor={red500}
                viewBox="0 0 20 20"
              />
            </span>
          </div>
        </div>

        <section>
          <div
            className="body"
            ref={div => (this._divItem = div)}
            onClick={this.activateMenu.bind(this, i)}
          >
            {l.static ? (
              <span
                className="text"
                title="This item is static and cannot be removed or resized."
              >
                Static - {i}
              </span>
            ) : (
              <span className="text">{i}</span>
            )}
          </div>
        </section>
      </div>
    );
  }
}

