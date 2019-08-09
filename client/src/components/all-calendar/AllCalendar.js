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
    eventTime: '',
    userEvents: [],
    clickedEvent: {}
  };
  eventClick = info => {
    // console.dir(info.event);
    // console.log('(%%%%%%', info.event._def.extendedProps.eventId);
    // alert(info.event);
    this.setState({
      clickedEvent: info.event
    });
  };

  userEvents = async () => {
    let result = await axios.get(
      `${process.env.REACT_APP_BASE}/userEvent/${this.props.theUser._id}`
    );
    // console.log('444444444444444444', result);
    return result.data;
  };

  handleDelete = async () => {
    // console.log("checking if we're hooked up button-wise");
    let eventId = this.state.clickedEvent._def.extendedProps.eventId;
    axios.post(`${process.env.REACT_APP_BASE}/delete/${eventId}`).then(() => {
      const filteredUserEvents = [...this.state.userEvents].filter(
        usrEvt => usrEvt._id !== eventId
      );
      console.log(filteredUserEvents);
      this.setState({
        userEvents: filteredUserEvents
      });
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async componentDidMount() {
    let userEvents = await this.userEvents();
    console.log('dddddddddddddddd', userEvents);
    this.setState({
      userEvents: userEvents.userEvents
    });
  }

  eventSubmitHandler = e => {
    e.preventDefault();
    const eTitle = this.state.eventTitle;
    const eDate = this.state.eventDate;
    const eTime = this.state.eventTime;
    const userId = this.props.theUser._id;

    axios
      .post(
        `${process.env.REACT_APP_BASE}/addEvent`,
        {
          userId: userId,
          title: eTitle,
          date: eDate,
          time: eTime
        }
        // { withCredentials: true }
      )
      .then(savedData => {
        const currentEvents = this.state.userEvents;
        this.setState({
          userEvents: [...currentEvents, savedData.data.userEvent],
          eventFormShowing: false,
          eventTitle: '',
          eventDate: '',
          eventTime: ''
        });
        // console.log(this.state.userEvents);
      });
  };

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
      // console.log('333333333333333!!!!!!', this.props.cosmicEvents);
      // console.log(cEvent.name);
      oneCosmic.date = cEvent.startDate;
      oneCosmic.title = cEvent.name;
      return oneCosmic;
    });

    // console.log(this.state.userEvents.userEvents, this.props.cosmicEvents);

    const allSanitizedEvents = [
      ...sanitizedWeatherEvents,
      ...sanitizedMoonEvents,
      ...sanitizedCosmicEvents
      // ...sanitizedUserEvents
    ];
    if (this.state.userEvents) {
      // console.log('broke');
      const sanitizedUserEvents = this.state.userEvents.map(uEvent => {
        let oneUserEvent = {};
        oneUserEvent.title = uEvent.title;
        oneUserEvent.date = uEvent.date;
        oneUserEvent.time = uEvent.time;
        oneUserEvent.eventId = uEvent._id;
        allSanitizedEvents.push(oneUserEvent);
      });
    }

    // console.log('&&&&&&', sanitizedCosmicEvents);
    // console.log('@@@@', allSanitizedEvents);

    const addEvent = () => {
      // console.log('@@@@@@@@@@@@@@@', this.state.eventFormShowing);
      this.setState({
        eventFormShowing: !this.state.eventFormShowing
      });
    };

    return (
      <div className="fullCal">
        {/* USER ADDING EVENT FORM */}
        <div className="sideMenu">
          <button onClick={addEvent}>Add Event</button>
          {this.state.eventFormShowing && (
            <div className="Modal">
              <form onSubmit={this.eventSubmitHandler}>
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

          <div className="textBox">
            <h3>Event Details</h3>
            <p>Title: {this.state.clickedEvent.title}</p>
            <button onClick={this.handleDelete} className="DeleteEvent">
              Delete
            </button>
            <div />
          </div>
        </div>

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
          eventClick={this.eventClick}
          events={allSanitizedEvents}
        />
      </div>
    );
  }
}
