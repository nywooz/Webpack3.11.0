import "bootstrap/dist/css/bootstrap.min.css";

import React, { Component } from "react";
import { render } from "react-dom";
import ReactDOM from "react-dom";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: true
//     };
//   }

//   render() {
//     return <p >test</p>;

//   }
// }

// ReactDOM.render(<App />, document.querySelector("#bodyRow"));

import HighchartApp from "./Chart/Demo/HighChart";
const highchart_Ele = document.querySelector("#highchart");
render(<HighchartApp />, highchart_Ele);

import HighchartApp2 from "./Chart/Demo/HighChart2";
const highchart_Ele2 = document.querySelector("#highchart2");
render(<HighchartApp2 />, highchart_Ele2);




import HighmapApp from "./Chart/Demo/Highmaps";
const highmap_Ele = document.querySelector("#highmap");
render(<HighmapApp />, highmap_Ele);

import HighstockApp from "./Chart/Demo/Highstock";
const highstock_Ele = document.querySelector("#highstock");
render(<HighstockApp />, highstock_Ele);
