import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
var Chart = require("react-chartjs").Pie;

const pop_legend_1 = { background: "#8591d5" }
const pop_legend_2 = { background: "#6c7bcc" }
const pop_legend_3 = { background: "#5364c3" }
const pop_legend_4 = { background: "#3f51b5" }
const pop_legend_5 = { background: "#36469c" }
const pop_legend_6 = { background: "#2d3a83" }
const pop_legend_7 = { background: "#252f69" }
const pop_legend_8 = { background: "#1c2450" }

const service_legend_1 = { background: "#ba160a" }
const service_legend_2 = { background: "#da1a0c" }
const service_legend_3 = { background: "#9a1208" }
const service_legend_4 = { background: "#7a0f07" }
const service_legend_5 = { background: "#590b05" }
const service_legend_6 = { background: "#390703" }
const service_legend_7 = { background: "#290502" }

const pop_services = {
  position: "left"
}

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceData: [
        { value: 100, color: "#8591d5", highlight: "#8591d5", label: "Men's Haircut" },
        { value: 50, color: "#6c7bcc", highlight: "#6c7bcc", label: "Women's Haircut" },
        { value: 50, color: "#5364c3", highlight: "#5364c3", label: "Kids's Haircut" },
        { value: 50, color: "#3f51b5", highlight: "#3f51b5", label: "Hair Colouring"},
        { value: 10, color: "#36469c", highlight: "#36469c", label: "Hair Extensions"},
        { value: 10, color: "#2d3a83", highlight: "#2d3a83", label: "Hair Highlights"},
        { value: 5, color: "#252f69", highlight: "#252f69", label: "Scalp Treatments"},
        { value: 25, color: "#1c2450", highlight: "#1c2450", label: "Laser Hair Removal"}
      ],
      dayData: [
        { value: 30, color: "#ba160a", highlight: "#ba160a", label: "Sunday" },
        { value: 50, color: "#da1a0c", highlight: "#da1a0c", label: "Monday" },
        { value: 45, color: "#9a1208", highlight: "#9a1208", label: "Tuesday" },
        { value: 25, color: "#7a0f07", highlight: "#7a0f07", label: "Wednesday" },
        { value: 20, color: "#590b05", highlight: "#590b05", label: "Thursday" },
        { value: 20, color: "#390703", highlight: "#390703", label: "Friday" },
        { value: 18, color: "#290502", highlight: "#290502", label: "Saturday" },

      ],
      chartOptions: {
        animationSteps :100,
        animationEasing : "easeInOutBack",
      }
    }
  }

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item sm={6}>
            <h2>Popular Services</h2>
          </Grid>
          <Grid item sm={6}>
            <h2>Services Per Day</h2>
          </Grid>

          <Grid item sm={3}>
            <Chart style={pop_services} data={this.state.serviceData} options={this.state.chartOptions}/>
          </Grid>

          <Grid item sm={3}>
            <div>
              <span style={pop_legend_1}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Men's Haircut <br />
              <span style={pop_legend_2}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Women's Haircut <br />
              <span style={pop_legend_3}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Kids's Haircut <br />
              <span style={pop_legend_4}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Hair Colouring <br />
              <span style={pop_legend_5}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Hair Extensions <br />
              <span style={pop_legend_6}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Hair Highlights <br />
              <span style={pop_legend_7}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Scalp Treatments <br />
              <span style={pop_legend_8}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Laser Hair Removal <br />
            </div>
          </Grid>

          <Grid item sm={3}>
            <Chart data={this.state.dayData} options={this.state.chartOptions}/>
          </Grid>

          <Grid item sm={3}>
            <div>
              <span style={service_legend_1}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Sunday <br />
              <span style={service_legend_2}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Monday <br />
              <span style={service_legend_3}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Tuesday <br />
              <span style={service_legend_4}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Wednesday <br />
              <span style={service_legend_5}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Thursday <br />
              <span style={service_legend_6}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Friday <br />
              <span style={service_legend_7}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Saturday <br />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default PieChart;