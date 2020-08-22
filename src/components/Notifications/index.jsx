import React, { Component } from 'react';
import CheckboxGroup from './CheckboxGroup'


class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    return (
      <div>
        <CheckboxGroup 
          formLabel="Daily preview" 
          formHelperText="A preview of your upcoming day, sent at 5am"
          email
          />
        <CheckboxGroup
          formLabel="Daily summary"
          formHelperText="A review of your day's work, sent at 8pm"
          email
          />
        <CheckboxGroup 
          formLabel="New appointment notification" 
          formHelperText="Get notified when a new booking is made"
          text
          />
      </div>
    );
  }
}
 
export default Notifications;