import React from "react";
import ReactDOM from "react-dom";

import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import ColumnEditor from "../form/ColumnEditor";

export default class MappedItemMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false
    };
  }

  onRequestChange = (event, reason) => {
    reason == "clickAway"
      ? this.setState({
          openMenu: false
        })
      : null;
  };

  handleClickMenu = event => {
    this.setState({
      openMenu: true
    });
  };

  handleListClick = event => {
    const modal_root = document.querySelector("#modal-root2");
    ReactDOM.render(
      <ColumnEditor
        itemSelected={this.itemSelected}
        modal_root={modal_root}
        modal={false}
        autoScrollBodyContent={true}
        data={this.props.card}
        open={true}
        onAddClick={submitData => {
          this.props.handleChange(submitData);
        }}
      />,
      modal_root
    );

    // open dialog
  };

  render() {
    return (
      <MuiThemeProvider>
        <IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          onRequestChange={this.onRequestChange.bind(this)}
          open={this.state.openMenu}
          onClick={this.handleListClick.bind(this)}
          onChange={this.handleChangeSingle}
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
          targetOrigin={{ horizontal: "left", vertical: "top" }}
        />
      </MuiThemeProvider>
    );
  }
}
