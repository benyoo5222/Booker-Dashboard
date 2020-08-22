import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

// handleTime = (event) => {
//   console.log(event.target.value);
// }

class HoursRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      day: null,
      opening: null,
      closing: null
    };
  }

  componentDidMount() {
    const { hours } = this.props;
    this.setState({
      day: hours.day || null ,
      opening: hours.opening || null ,
      closing: hours.closing || null
    })
  }

  buildHours = () => {
    const hoursPackage = {
      packageType: "hours",
      hoursInfo: {
        day: this.props.hours.day,
        opening: this.state.opening,
        closing: this.state.closing
      }
    }
    return hoursPackage;
  }

  setHoursState = (key, value) => {
    this.setState( () => ({
      [key]: value
    }));
  }

  handleTimeChange = (event) => {
    const {name, value} = event.target;
    const myPromise = new Promise( (resolve, reject) => {
      this.setHoursState(name, value);
      resolve();
    });
    myPromise.then( () => {
      const hoursPackage = this.buildHours();
      this.props.handleBusinessInput(hoursPackage);
    });
  }

  render(){
    return (
      <TableRow>
        <TableCell>
          {this.props.hours.day}
        </TableCell>
        <TableCell>
          <form noValidate>
            <TextField
              id="open"
              type="time"
              name="opening"
              defaultValue={this.props.hours.opening}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={this.handleTimeChange}
            />
          </form>
        </TableCell>
        <TableCell>
          <form noValidate>
            <TextField
              id="close"
              type="time"
              name="closing"
              defaultValue={this.props.hours.closing}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={this.handleTimeChange}
            />
          </form>
        </TableCell>
      </TableRow>
    );
  }
}

export default HoursRow;