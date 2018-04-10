import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Load Highcharts
import Highcharts from 'highcharts';

class Chart extends Component {
  componentDidMount() {
    this.chart = new Highcharts[this.props.type || 'Chart'](
      this.chartEl,
      this.props.options
    );
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return <div ref={el => (this.chartEl = el)} />;
  }
}



class App extends Component {
  render() {
    const options = {
      chart: {
        type: 'bar'
    },
    title: {
        text: 'Stacked bar chart'
    },
    xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total fruit consumption'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
        name: 'John',
        data: [5, 3, 4, 7, 2]
    }, {
        name: 'Jane',
        data: [2, 2, 3, 2, 1]
    }, {
        name: 'Joe',
        data: [3, 4, 4, 2, 5]
    }]
    };

    return (
      <div className="App">



        <Chart
          options={options} />
      </div>
    );
  }
}

export default App;
