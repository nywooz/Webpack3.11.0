import React, { Component } from "react";
import ReactDOM from "react-dom";
// import chartsFactory from './chartsFactory';
// import highcharts from 'highcharts';
// export default chartsFactory('Chart', highcharts);

// Load Highcharts
import Highcharts from "highcharts";

export default class ReactHighcharts extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   options: this.props.options
    // };
  }

  componentDidMount() {
    this.chart = new Highcharts[this.props.type || "Chart"](
      this.chartEl,
      this.props.options
    );

    // debugger;
    // to set chart 100% responsive
    // var height = this.chartEl.clientHeight;
    // var width = this.chartEl.clientWidth;
    // this.chart.setSize(width, height);
    // this.chart.reflow();
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  componentWillReceiveProps(nextProps) {
    this.chart.destroy();

    this.chart = new Highcharts[this.props.type || "Chart"](
      this.chartEl,
      nextProps.options
    );
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   debugger;
  //   //  Skips render() if returns false
  //   // fires before rendering with new props or state
  // }

  componentWillUpdate(nextProps, nextState) {
    // debugger;
    // fires immediately before rendering
    // with new props or state
  }

  componentDidUpdate(prevProps, prevState) {
    // debugger;
    // fires immediately after rendering with new P or S
  }

  render() {
    //const options = { ...this.props, options: defaultOptions };

    //
    if(this.props.options.table){
      
    }

    const options = this.props.options || defaultOptions;

    return (
      <div className="highcharts-root">
        <div className="highcharts-container" ref={el => (this.chartEl = el)} />
      </div>
    );
  }
}

const defaultOptions = {
  chart: {
    type: "bar"
  },
  title: {
    text: "Default Stacked bar chart Sample"
  },
  xAxis: {
    categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"]
  },
  yAxis: {
    min: 0,
    title: {
      text: "Total fruit consumption"
    }
  },
  legend: {
    reversed: true
  },
  plotOptions: {
    series: {
      stacking: "normal"
    }
  },
  series: [
    {
      name: "John",
      data: [5, 3, 4, 7, 2]
    },
    {
      name: "Jane",
      data: [2, 2, 3, 2, 1]
    },
    {
      name: "Joe",
      data: [3, 4, 4, 2, 5]
    }
  ]
};
