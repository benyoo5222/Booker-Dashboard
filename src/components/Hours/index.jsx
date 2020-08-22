import React, {Component} from 'react';
import HoursTable from './HoursTable.jsx';

class Hours extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <HoursTable
        businessHours={this.props.businessHours}
        handleBusinessInput={this.props.handleBusinessInput}
      />
    );
  }
}

export default Hours;