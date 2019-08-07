// import React, { Component } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import './weatherCalendar.css';

// export default class WeatherCalendar extends Component {
//   render() {
//     console.log('weather events', this.props);
//     const sanitizedWeatherEvents = this.props.weatherEvents.map(wEvent => {
//       let oneWeather = {};
//       // let sanitizedDate = wEvent.dateTimeISO.split('T')[0];
//       // oneWeather.date = sanitizedDate;
//       oneWeather.date = wEvent.dateTimeISO;
//       oneWeather.title = wEvent.weather;
//       return oneWeather;
//     });

//     // do the same thing but and then add as a value to events

//     return (
//       <div>
//         <FullCalendar
//           defaultView="dayGridMonth"
//           plugins={[dayGridPlugin]}
//           weekends={true}
//           events={sanitizedWeatherEvents}
//         />
//         {/* <ul>
//           <li>
//             {JSON.stringify(this.props.weatherEvents)}
//             {this.props.weqatherEvents.map(wEvent => {
//               return <p>{wEvent.name}</p>;
//             })}
//           </li>
//         </ul> */}
//       </div>
//     );
//   }
// }
