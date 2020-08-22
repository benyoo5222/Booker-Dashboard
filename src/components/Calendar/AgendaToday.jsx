import PropTypes from 'prop-types'
import React from 'react'
import classes from 'dom-helpers/class'
import getWidth from 'dom-helpers/query/width'
import scrollbarSize from 'dom-helpers/util/scrollbarSize'

import localizer from 'react-big-calendar/lib/localizer'
import message from 'react-big-calendar/lib/utils/messages'
import dates from 'react-big-calendar/lib/utils/dates'
import { navigate } from 'react-big-calendar/lib/utils/constants'
import { accessor as get } from 'react-big-calendar/lib/utils/accessors'
import { accessor, dateFormat, dateRangeFormat } from 'react-big-calendar/lib/utils/propTypes'
import { inRange } from 'react-big-calendar/lib/utils/eventLevels'
import { isSelected } from 'react-big-calendar/lib/utils/selection'

const SINGLE_DAY = 1
const SAME_DAY = 0
const currentAppointmentStyle = {
  border: '2px solid #ff5722'
}
const pastAppointmentStyle = {
  backgroundColor: 'rgb(240,240,240)',
  color: '#aaa'
}

class AgendaToday extends React.Component {
  static propTypes = {
    events: PropTypes.array,
    date: PropTypes.instanceOf(Date),
    length: PropTypes.number.isRequired,
    titleAccessor: accessor.isRequired,
    tooltipAccessor: accessor.isRequired,
    allDayAccessor: accessor.isRequired,
    startAccessor: accessor.isRequired,
    endAccessor: accessor.isRequired,
    eventPropGetter: PropTypes.func,
    selected: PropTypes.object,

    agendaDateFormat: dateFormat,
    agendaTimeFormat: dateFormat,
    agendaTimeRangeFormat: dateRangeFormat,
    culture: PropTypes.string,

    components: PropTypes.object.isRequired,
    messages: PropTypes.shape({
      date: PropTypes.string,
      time: PropTypes.string,
    }),
  }

  static defaultProps = {
    length: 1,
  }


  componentDidMount() {
    this._adjustHeader()
  }

  componentDidUpdate() {
    this._adjustHeader()
  }

  render() {
    let { date, events, startAccessor } = this.props
    let messages = message(this.props.messages)

    // Work-aroundfor default behaviour hiding events before today's *time* on *any* day
    // let range = dates.range(date, end, 'day')
    // events = events.filter(event => inRange(event, date, end, this.props))
    let range = [dates.startOf(date, 'day')]
    
    
    events.sort((a, b) => +get(a, startAccessor) - +get(b, startAccessor))

    return (
      <div className="rbc-agenda-view">
        <table ref="header" className="rbc-agenda-table">
          <thead>
            <tr>
              <th className="rbc-header" ref="timeCol">
                {messages.time}
              </th>
              <th className="rbc-header">{messages.event}</th>
            </tr>
          </thead>
        </table>
        <div className="rbc-agenda-content" ref="content">
          <table className="rbc-agenda-table">
            <tbody ref="tbody">
              {range.map((day, idx) => this.renderDay(day, events, idx))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderDay = (day, events, dayKey) => {
    let {
      components,
      titleAccessor,
      eventPropGetter,
      startAccessor,
      endAccessor,
      selected,
    } = this.props

    let EventComponent = components.event

    events = events.filter(e => inRange(e, day, day, this.props))

    return events.map((event, idx) => {
      const { className, style } = eventPropGetter
        ? eventPropGetter(
            event,
            get(event, startAccessor),
            get(event, endAccessor),
            isSelected(event, selected)
          )
        : {}

      let title = get(event, titleAccessor)

      let eventIsOver = (event.end < new Date())
      let eventIsOccuringNow = (event.start < new Date() && event.end > new Date()) 

      // TODO: un-nest this decision tree
      const thisAppointmentStyle = eventIsOver 
        ? {...style, ...pastAppointmentStyle} 
        : (
          eventIsOccuringNow 
            ? {...style, ...currentAppointmentStyle} 
            : style
          )

      return (
        <tr key={dayKey + '_' + idx} className={className} style={thisAppointmentStyle}>
          <td className="rbc-agenda-time-cell">
            {this.timeRangeLabel(day, event)}
          </td>
          <td className="rbc-agenda-event-cell">
            {EventComponent ? (
              <EventComponent event={event} title={title} />
            ) : (
              title
            )}
          </td>
        </tr>
      )
    }, [])
  }

  timeRangeLabel = (day, event) => {
    let {
      endAccessor,
      startAccessor,
      allDayAccessor,
      culture,
      messages,
      components,
    } = this.props

    let labelClass = '',
      TimeComponent = components.time,
      label = message(messages).allDay

    let start = get(event, startAccessor)
    let end = get(event, endAccessor)

    if (!get(event, allDayAccessor)) {
      if (dates.eq(start, end, 'day')) {
        label = localizer.format(
          { start, end },
          this.props.agendaTimeRangeFormat,
          culture
        )
      } else if (dates.eq(day, start, 'day')) {
        label = localizer.format(start, this.props.agendaTimeFormat, culture)
      } else if (dates.eq(day, end, 'day')) {
        label = localizer.format(end, this.props.agendaTimeFormat, culture)
      }
    }

    if (dates.gt(day, start, 'day')) labelClass = 'rbc-continues-prior'
    if (dates.lt(day, end, 'day')) labelClass += ' rbc-continues-after'

    return (
      <span className={labelClass.trim()}>
        {TimeComponent ? (
          <TimeComponent event={event} day={day} label={label} />
        ) : (
          label
        )}
      </span>
    )
  }

  _adjustHeader = () => {
    let header = this.refs.header
    let firstRow = this.refs.tbody.firstChild

    if (!firstRow) return

    let isOverflowing =
      this.refs.content.scrollHeight > this.refs.content.clientHeight
    let widths = this._widths || []

    this._widths = [
      getWidth(firstRow.children[0]),
      getWidth(firstRow.children[1]),
    ]

    if (widths[0] !== this._widths[0] || widths[1] !== this._widths[1]) {
      this.refs.timeCol.style.width = this._widths[0] + 'px'
    }

    if (isOverflowing) {
      classes.addClass(header, 'rbc-header-overflowing')
      header.style.marginRight = scrollbarSize() + 'px'
    } else {
      classes.removeClass(header, 'rbc-header-overflowing')
    }
  }
}

AgendaToday.range = (start, { length = SAME_DAY }) => {
  let end = dates.add(start, SAME_DAY, 'day')
  return { start, end }
}

AgendaToday.navigate = (date, action, { length = SINGLE_DAY }) => {
  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -SINGLE_DAY, 'day')

    case navigate.NEXT:
      return dates.add(date, SINGLE_DAY, 'day')

    default:
      return date
  }
}

AgendaToday.title = (
  start,
  { length = SINGLE_DAY, formats, culture }
) => {
  return localizer.format( start, formats.dayHeaderFormat, culture)
}

export default AgendaToday