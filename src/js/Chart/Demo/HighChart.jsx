import React from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
    setInterval(
      () => this.setState({ data: [...Array(3)].map(Math.random) }),
      500
    );
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
