import React from "react";
import ReactDOM from "react-dom";

const icon_div_style = {
  margin: "10px",
  width: "fit-content",
  background: "#eaeaea"
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div style={icon_div_style}>
          <i className="fas fa-chart-pie fa-3x" />
        </div>
        <div style={icon_div_style}>
          <i className="fas fa-chart-line fa-3x" />
        </div>
        <div style={icon_div_style}>
          {" "}
          <i className="fas fa-chart-bar fa-3x" />{" "}
        </div>
        <div style={icon_div_style}>
          {" "}
          <i className="fas fa-chart-area fa-3x" />{" "}
        </div>
        <div style={icon_div_style}>
          {" "}
          <i className="fas fa-font fa-3x" />{" "}
        </div>
      </div>
    );
  }
}

// const rootEl = document.getElementById("root2");
// rootEl ? ReactDOM.render(<App />, rootEl) : null;
