const dashboard = require("../css/dashboard.css");
import 'typeface-roboto'

import React from "react";
import ReactDOM from "react-dom";


class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}






ReactDOM.render(
  <Welcome
    open={false} />,
  document.querySelector(".container-app")
);

