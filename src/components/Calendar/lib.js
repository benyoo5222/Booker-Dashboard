import React from 'react'
import axios from 'axios'
import { API_KEY, CALENDAR_ID } from '../../calendar_secrets.json'

import LocalAtm from '@material-ui/icons/LocalAtm'
import CreditCard from '@material-ui/icons/CreditCard'

// https://blog.daftcode.pl/react-calendar-with-google-calendar-as-cms-tutorial-5f5d81e425a9

// let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`
let url = "https://nzwls2ig39.execute-api.us-east-1.amazonaws.com/abc";
console.log("url", url)

export function getEvents() {
  return axios.get(url)
    .then(res => {
      console.log("events", res);
      let events = []
      // events = res.data.items.map(event => {
      //   return {
      //     start: event.start.date || new Date(event.start.dateTime),
      //     end: event.end.date || new Date(event.end.dateTime),
      //     title: event.summary,
      //     summary: event.summary,
      //     description: event.description,
      //     customer: {
      //       name: event.extendedProperties.private.customerName,
      //       email: event.extendedProperties.private.customerEmail,
      //       phone: event.extendedProperties.private.customerPhone,
      //     },
      //     payment: {
      //       totalPrice: event.extendedProperties.private.totalPrice,
      //       method: event.extendedProperties.private.paymentMethod,
      //     },
      //     serviceList: event.extendedProperties.private.serviceList
      //   }
      // })
      return events
    })
    .catch(err => {
      console.error(err)
    })
}

export function EventAgenda ({ event }) {
  let tax = Number(event.payment.totalPrice * .13);
  let totalPrice = Number(event.payment.totalPrice) + tax;
  return (
    <div>
      <p>
        <strong>{event.customer.name} </strong>
        <span style={{paddingLeft: '22px'}}>{event.serviceList}</span>
        <a style={{float: 'right'}} href={`mailto:${event.customer.email}`}>Email</a>
      <br/>
        {
          event.payment.method === 'cash'
          ? <LocalAtm style={{...iconStyle, color: '#00ad45'}}/>
          : <CreditCard style={{...iconStyle, color: '#00afe1'}}/>
        }
        <em>{/*Jeff added this*/}
          {formatMoney(totalPrice)}
          {event.payment.method === 'cash' ? ' due' : ' paid via Stripe'}
        </em>
        <a href={`tel:${event.customer.phone}`} style={{float: 'right'}}>
          {formatPhoneNumber(event.customer.phone)}
        </a>
      </p>
    </div>
  )
}

const iconStyle = {
  marginBottom: '-6px',
  marginRight: '12px'
}

// https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
function formatPhoneNumber(s) {
  var s2 = (""+s).replace(/\D/g, '');
  var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}

function formatMoney(priceCents) {
  return `$ ${(priceCents / 100.0).toFixed(2)}`
}