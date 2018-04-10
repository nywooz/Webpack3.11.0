import React, { Component } from "react";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faChartArea } from "@fortawesome/fontawesome-free-solid";
import { MuiThemeProvider, getMuiTheme, RaisedButton } from "material-ui";

var withOpeningDock = ComposedComponent =>
  class extends Component {
    constructor() {
      super();
      this.state = {
        builderOpen: false
      };
    }

    toggleConfigurator = () => {
      this.setState({
        builderOpen: !this.state.builderOpen
      });
    };

    render() {
      if (!this.state.builderOpen) {
        return (
          <div className="">
            <RaisedButton
              style={{ margin: "10px 0px" }}
              key="1"
              labelPosition="after"
              label="Advance Layout"
              onClick={this.toggleConfigurator}
              icon={<FontAwesomeIcon icon="chevron-circle-down" />}
            />
          </div>
        );
      }

      return (
        <div>
          <ComposedComponent
            {...this.props}
            builderOpen={this.state.builderOpen}
          />

          <div className="">
            <RaisedButton
              style={{ margin: "5 0" }}
              labelPosition="after"
              label="Advance Layout"
              onClick={this.toggleConfigurator}
              icon={<FontAwesomeIcon icon="chevron-circle-up" />}
            />
          </div>
        </div>
      );
    }
  };

export default withOpeningDock;
