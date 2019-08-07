import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './cosmicCalendar.css';

export default class CosmicCalendar extends Component {
  render() {
    // console.log('cosmic events', this.props.cosmicEvents);

    return (
      <div>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          weekends={true}
          events={[
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' }
          ]}
        />
        {/* <ul> */}
        {/* <li> */}
        {/* {this.props.cosmicEvents.map(cEvent => {
            return <p>{cEvent.name}</p>;
          })} */}
        {/* </li> */}
        {/* </ul> */}
      </div>
    );
  }
}
