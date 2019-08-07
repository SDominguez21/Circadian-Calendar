import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/timegrid/main.css';
import './allCalendar.css';

export default class AllCalendar extends Component {
  // calendarComponentRef = React.createRef();

  render() {
    const sanitizedWeatherEvents = this.props.weatherEvents.map(wEvent => {
      let oneWeather = {};
      // let sanitizedDate = wEvent.dateTimeISO.split('T')[0];
      // oneWeather.date = sanitizedDate;
      oneWeather.date = wEvent.dateTimeISO;
      oneWeather.title = wEvent.weather;
      return oneWeather;
    });

    const sanitizedMoonEvents = this.props.moonEvents.map(mEvent => {
      let oneMoon = {};
      oneMoon.date = mEvent.dateTimeISO;
      oneMoon.title = mEvent.name;
      return oneMoon;
    });

    const sanitizedCosmicEvents = this.props.cosmicEvents.map(cEvent => {
      let oneCosmic = {};
      oneCosmic.date = cEvent.date;
      oneCosmic.name = cEvent.name;
      return oneCosmic;
    });

    const allSanitizedEvents = [
      ...sanitizedWeatherEvents,
      ...sanitizedMoonEvents,
      ...sanitizedCosmicEvents
    ];
    console.log('@@@@', allSanitizedEvents);

    // MUST FIX HANDLE DATE CLICK EX:
    // handleDateClick = () => {
    //   if ('Would you like to add an event to ' + arg.dateStr + ' ?') {
    //     this.setState({
    //       // add new event data
    //       calendarEvents: this.state.calendarEvents.concat({
    //         // creates a new array
    //         title: 'New Event',
    //         start: arg.date,
    //         allDay: arg.allDay
    //       })
    //     });
    //   }
    // };

    return (
      <div>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          // editable={true}
          weekends={true}
          header={{
            left: 'prev,next,today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }}
          // ref={this.calendarComponentRef}
          // dateClick={this.handleDateClick}
          // events={[{ sanitizedWeatherEvents }, { sanitizedMoonEvents }]}
          events={allSanitizedEvents}
        />
      </div>
    );
  }
}
