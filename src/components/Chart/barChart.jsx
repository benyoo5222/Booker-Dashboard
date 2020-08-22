import React, {Component} from 'react';
var Chart = require("react-chartjs").Bar;

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM",
        "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"],
        datasets: [
          {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [0, 2, 2, 1, 6, 2, 2, 4, 4, 5, 10, 8, 6, 0, 0]
          }
        ]
      },
      chartOptions: {
        scaleBeginAtZero : true,
      }
    }
  }

  render(){
    return(
      <div>
        <h2>Average Appointments Per Hour</h2>
        <Chart data={this.state.chartData} options={this.state.chartOptions} width="600" height="350"/>
      </div>
    );
  }

}

export default BarChart;