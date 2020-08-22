import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import SetupDialog from './SetupDialog'

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: this.props.business.name,
      address: this.props.business.address,
      phone: this.props.business.phone,
      maxConcurrentAppointments: this.props.business.calendarData.maxConcurrentAppointments
     }
  }

  handleChange = key => event => {
    this.setState({
      [key]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <TextField
          id="name"
          label="Business Name"
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          style={{display: 'block'}}
        />
        <TextField
          id="address"
          label="Address"
          value={this.state.address}
          onChange={this.handleChange('address')}
          margin="normal"
          style={{display: 'block'}}
        />
        <TextField
          id="phone"
          label="Primary Phone"
          value={this.state.phone}
          onChange={this.handleChange('phone')}
          margin="normal"
          style={{display: 'block'}}
        />
        <TextField
          id="maxConcurrentAppointments"
          label="Concurrent Appointments"
          value={this.state.maxConcurrentAppointments}
          onChange={this.handleChange('maxConcurrentAppointments')}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <div style={{position: 'absolute', bottom: '20px'}}>
          <SetupDialog/>
        </div>
      </div>
    );
  }
}
 
export default Notifications;