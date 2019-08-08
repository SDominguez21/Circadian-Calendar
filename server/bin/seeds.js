const mongoose = require('mongoose');
const Event = require('../models/Event');

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  // .connect('mongodb://localhost/CircadianCalendar', { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const event = [
  {
    id: null,
    name: 'Perseid Meteors',
    type: 'Meteor Shower',
    time: null,
    startDate: '2019-07-17T00:00:00+00:00"',
    endDate: '2019-08-24T00:00:00+00:00',
    location: 'Northern Hemisphere',
    description: 'Peak: 08/12/2019-08/13/2019, Parent: Comet 109P/Swift-Tuttle',
    img: null
  },
  {
    id: null,
    name: 'Sturgeon Moon',
    type: 'Full Moon',
    time: null,
    startDate: '2019-08-15T00:00:00+00:00',
    endDate: null,
    location: null,
    description: "August's Full Moon named after lake sturgeon.",
    img: ''
  },
  {
    id: null,
    name: 'Harvest Moon',
    type: 'Full Moon',
    time: null,
    startDate: '2019-09-14T00:00:00+00:00',
    endDate: null,
    location: null,
    description:
      'The Full Moon closest to the September equinox is called the Harvest Moon. In the Northern Hemisphere, the time between successive moonrises will be shorter around this period.',
    img: ''
  },
  {
    id: null,
    name: 'Micro Full Moon',
    type: 'Full Moon',
    time: null,
    startDate: '2019-09-14T00:00:00+00:00',
    endDate: null,
    location: null,
    description:
      "September's Full Moon will take place at the same time as the Moon is farthest away from the Earth on its orbit, making it a Micro Full Moon. It may look less bright than a usual Full Moon or a Supermoon.",
    img: ''
  },
  {
    id: null,
    name: 'September Equinox',
    type: null,
    time: null,
    startDate: '2019-09-23T00:00:00+00:00',
    endDate: null,
    location: 'Northern Hemisphere',
    description:
      'Also known as the autumnal (fall) equinox in the Northern Hemisphere, the September Equinox is considered by many as the first day of fall.',
    img: ''
  },
  {
    id: null,
    name: 'Draconid Meteor Shower',
    type: 'Meteor Shower',
    time: 'just before nightfall',
    startDate: '2019-10-06T00:00:00+00:00',
    endDate: '2019-10-10T00:00:00+00:00',
    location: 'Northern Hemisphere',
    description:
      'Peak: 10/08/2019- 10/09/2019, Parent: Comet 21P/Giacobini-Zinner',
    img: ''
  },
  {
    id: null,
    name: "Hunter's Moon",
    type: 'Full Moon',
    time: null,
    startDate: '2019-10-13T00:00:00+00:00',
    endDate: null,
    location: 'Northern Hemisphere',
    description:
      "In many Native American cultures, October is the month of hunting and preparing for the upcoming winter season. This is why October's Full Moon is often called Hunter's Moon. It is sometimes known as the Blood Moon or Sanguine Moon, though in recent years, the term Blood Moon is also used to refer to a total lunar eclipse.",
    img: ''
  },
  {
    id: null,
    name: 'Orionid Meteor Shower',
    type: 'Meteor Shower',
    time: 'just after midnight and before the Sun rises',
    startDate: '2019-10-02T00:00:00+00:00',
    endDate: '2019-11-07T00:00:00+00:00',
    location: 'Both Hemispheres',
    description: 'Peak: 10/21/2019-10/22/2019, Parent: Comet 1P/Halley',
    img: ''
  },
  {
    id: null,
    name: 'Mercury Transit',
    type: 'Mercury Transit',
    time: null,
    startDate: '2019-11-11T00:00:00+00:00',
    endDate: '2019-11-12T00:00:00+00:00',
    location: 'Visible from most parts of the world',
    description:
      'Mercury, the smallest planet of our solar system, will move between the Sun and the Earth and appear as a small, dark speck of dust in front of the Sun for about 5 hours and 30 minutes. Like solar eclipses, must be viewed using specialized eyewear.',
    img: ''
  },
  {
    id: null,
    name: 'Beaver Moon',
    type: 'Full Moon',
    time: null,
    startDate: '2019-11-12T00:00:00+00:00',
    endDate: null,
    location: null,
    description:
      "November's Full Moon is called a Beaver Moon, after beavers that build their dams during this time of the year.",
    img: ''
  },
  {
    id: null,
    name: 'Leonid Meteor Shower',
    type: 'Meteor SHower',
    time: null,
    startDate: '2019-11-06T00:00:00+00:00',
    endDate: '2019-11-30T00:00:00+00:00',
    location: 'Both Hemispheres',
    description:
      'Called Leonids because the point in the sky where the meteors seem to emerge from, lies in the constellation Leo. Peak: 11/17/2019-11/18/2019, Parent: Comet 55P/Tempel-Tuttle',
    img: ''
  },
  {
    id: null,
    name: 'Cold Moon',
    type: 'Full Moon',
    time: null,
    startDate: '2019-12-12T00:00:00+00:00',
    endDate: null,
    location: '',
    description:
      "The year's final Full Moon in December is called a Cold Moon because of low temperatures in most locations in the Northern Hemisphere.",
    img: ''
  },
  {
    id: null,
    name: 'Geminid Meteors',
    type: 'Meteor Shower',
    time: null,
    startDate: '2019-12-04T00:00:00+00:00',
    endDate: '2019-12-17T00:00:00+00:00',
    location: 'Both Hemispheres',
    description:
      "Geminids are not associated with a comet but with an asteroid: null00 Phaethon. The asteroid takes about 1.4 years to orbit the Sun. During it's peak, 12/14-12/15, there is a possibility of sighting around 120 meteors per hour.",
    img: ''
  },
  {
    id: null,
    name: 'December Solstice',
    type: 'Solstice',
    time: null,
    startDate: '2019-12-21T00:00:00+00:00',
    endDate: null,
    location: 'Northern Hemisphere',
    description:
      'The shortest day of the year in the Northern Hemisphere. In the Southern Hemisphere, it is the longest day of the year and is called the summer solstice. Occurs when the Sun reaches its most southerly declination of -23.4 degrees. In other words, when the North Pole is tilted furthest away from the Sun.',
    img: ''
  },
  {
    id: null,
    name: 'Ursid Meteors',
    type: 'Meteor Shower',
    time: null,
    startDate: '2019-12-17T00:00:00+00:00',
    endDate: '2019-12-26T00:00:00+00:00',
    location: 'Northern Hemisphere',
    description:
      'At its peak, 12/22-12/23, observers may be able to view as many as 10 meteors in an hour. Partent: Comet 8P/Tuttle',
    img: ''
  }
  // cosmic events in 2020
  // {
  //   id: null,
  //   name: null,
  //   type: null,
  //   time: null,
  //   startDate: null,
  //   endDate: null,
  //   location: null,
  //   description: ' peak + parent if meteor ',
  //   img: ''
  // }
]; //end

Event.create(event);
