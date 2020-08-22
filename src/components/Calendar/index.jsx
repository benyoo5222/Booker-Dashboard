import React, { Component } from 'react';
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import { getEvents, EventAgenda } from './lib.js'
import AgendaToday from './AgendaToday'
BigCalendar.momentLocalizer(moment)

require('react-big-calendar/lib/css/react-big-calendar.css')

const calendarStyle = {
  height: '500px'
}

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: []
     }
  }
  componentDidMount() {
    getEvents().then(events => {
      this.setState({events})
    })
  }
  
  render() { 
    return (
      <div>
        <BigCalendar 
          style={calendarStyle}
          events={this.state.events}
          defaultDate={new Date()}
          defaultView='agenda'
          drilldownView="agenda"
          views={{
            month: true,
            week: true,
            day: true,
            agenda: AgendaToday
          }}
          scrollToTime={new Date()}
          components={{
            agenda: {
              event: EventAgenda
            }
          }}
          />
      </div>
     )
  }
}
 
export default Calendar;