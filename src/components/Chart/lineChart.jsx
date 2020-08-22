import React, {Component} from 'react';
var LineChart = require("react-chartjs").Line;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMonthly: {
        labels: ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
        ],
        datasets: [
          {
            label: "",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [680, 827, 714, 781, 856, 855, 740, 891, 762, 612, 650, 610]
          }
        ]
      },
      dataWeekly: {
        labels: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        datasets: [
          {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [34, 24, 29, 27, 30, 39, 42]
          }
        ]
      },
      chartOptions: {
        scaleShowGridLines : true,
        pointDot : true,
      }
    }
  }

  render() {
    return (
      <div>
        <h2>Number of Appointments Per Week</h2>
        <LineChart data={this.state.dataWeekly} options={this.state.chartOptions} width="600" height="250"/>
        <h2>Number of Appointments Per Month</h2>
        <LineChart data={this.state.dataMonthly} options={this.state.chartOptions} width="600" height="250"/>
      </div>
    );
  }
}

export default Chart;