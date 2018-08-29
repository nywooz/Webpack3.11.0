import React from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
let myVar = 0;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
    myVar=setInterval(
      () => this.setState({ data: [...Array(3)].map(Math.random) }),
      1500
    );
  }

  componentWillUnmount (){
    clearInterval(myVar);
  }

  render() {
    const cb = function() {};
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          series: [{ data: this.state.data }],
          chart: {
            type: "area",
            animation: true,
            events: { load: cb }
          }
        }}
      />
    );
  }
}
