import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import '@fullcalendar/timegrid/main.css';
import './allCalendar.css';

export default class AllCalendar extends Component {
  state = {
    eventFormShowing: false,
    eventTitle: '',
    eventDate: '',
    eventTime: ''
  };
  // eventClick = info => {
  //   console.dir(info.event.title);
  //   alert('you clicked on boring old me');
  // };

  userEvents = async () => {
    let result = await axios.get(`${process.env.REACT_APP_BASE}/userEvent`);
    // return result.data;
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async componentDidMount() {
    let userEvents = this.userEvents();
  }

  render() {
    const sanitizedWeatherEvents = this.props.weatherEvents.map(wEvent => {
      let oneWeather = {};
      // console.log(wEvent.dateTimeISO);
      oneWeather.date = wEvent.dateTimeISO;
      oneWeather.title = wEvent.weather;
      return oneWeather;
    });

    const sanitizedMoonEvents = this.props.moonEvents.map(mEvent => {
      let oneMoon = {};
      // console.log('88888', mEvent.dateTimeISO);
      oneMoon.date = mEvent.dateTimeISO;
      oneMoon.title = mEvent.name;
      return oneMoon;
    });

    const sanitizedCosmicEvents = this.props.cosmicEvents.map(cEvent => {
      let oneCosmic = {};
      console.log('333333333333333!!!!!!', this.props.cosmicEvents);
      console.log(cEvent.startDate);
      oneCosmic.date = cEvent.startDate;
      oneCosmic.name = cEvent.name;
      return oneCosmic;
    });

    const allSanitizedEvents = [
      ...sanitizedWeatherEvents,
      ...sanitizedMoonEvents,
      ...sanitizedCosmicEvents
    ];

    // console.log('&&&&&&', sanitizedCosmicEvents);
    console.log('@@@@', allSanitizedEvents);

    const addEvent = () => {
      // console.log('@@@@@@@@@@@@@@@', this.state.eventFormShowing);
      this.setState({
        eventFormShowing: !this.state.eventFormShowing
      });
    };

    return (
      <div className="fullCal">
        {/* USER ADDING EVENT */}
        <button onClick={addEvent}>Add Event</button>
        {this.state.eventFormShowing && (
          <div className="Modal">
            <form onSubmit={this.userEvent}>
              <h3>Add Event</h3>

              <legend>Title</legend>
              <input
                value={this.state.titleInput}
                name="eventTitle"
                onChange={this.handleChange}
              />

              <legend>Date</legend>
              <input
                value={this.state.dateInput}
                name="eventDate"
                placeholder="YYYY-MM-DD"
                onChange={this.handleChange}
              />

              <legend>Time</legend>
              <input
                value={this.state.timeInput}
                name="eventTime"
                onChange={this.handleChange}
              />
              <button>Submit</button>
            </form>
          </div>
        )}
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
          // eventClick={this.eventClick}
          events={allSanitizedEvents}
        />
        <div />
      </div>
    );
  }
}
