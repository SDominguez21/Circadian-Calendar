const express = require('express');
const router = express.Router();
const request = require('request');
const rp = require('request-promise');
const Event = require('../models/Event');
const User = require('../models/User');
const UserEvent = require('../models/UserEvent');

/* GET home page */
router.get('/', (req, res, next) => {
  res.json({ message: "it's ok" });
});

router.get('/allCallsForMonth', async (req, res, next) => {
  // console.log('hello you rang?');

  let weather = [];
  let moon = [];
  let cosmicEvent = [];
  await rp
    .get({
      url:
        'https://api.aerisapi.com/forecasts/miami,fl?filter=daynight&limit=60&format=json&client_id=ubVTEqqaNjJ2GI2wGFHqj&client_secret=DTmrLknIoE2Bk2HOBj6jHKJqcj0CBDK5KhyZTkoR'
    })
    .then(data => {
      weather.push(...JSON.parse(data).response[0].periods);
      // console.log(weather);
    });
  await rp
    .get({
      url:
        'https://api.aerisapi.com/sunmoon/moonphases?limit=31&miami,fl&from=08/02/2019&format=json&client_id=ubVTEqqaNjJ2GI2wGFHqj&client_secret=DTmrLknIoE2Bk2HOBj6jHKJqcj0CBDK5KhyZTkoR'
    })
    .then(data => {
      moon.push(...JSON.parse(data).response);
    });

  await Event.find({
    startDate: { $gte: '2019-07-01', $lte: '2019-12-31' }
  }).then(results => {
    // console.log('!!!!!!!!', results);
    cosmicEvent.push(...results);
  });

  // console.log('88888888888', cosmicEvent);
  res.json({
    weather: weather,
    moon: moon,
    cosmic: cosmicEvent
  });
});

// call to data base to get all the user events
router.get('/userEvent/:userId', async (req, res, next) => {
  // console.log('inside userEvent');

  let userEvents = [];
  await UserEvent.find({
    userId: req.params.userId
  }).then(results => {
    userEvents.push(...results);
  });
  console.log(userEvents);

  res.json({
    userEvents: userEvents
  });
});

router.post('/addEvent', (req, res, next) => {
  // console.log('inside user add event');
  let { title, date, time, userId } = req.body;
  // console.log(title, date, time);

  const newUserEvent = new UserEvent({
    userId: userId,
    title: title,
    date: date,
    time: time
  });

  newUserEvent.save().then(savedEvent => {
    res.json({ userEvent: savedEvent });
  });
});

router.post('/delete/:eventId', (req, res, next) => {
  console.log('wake me up inside', req.params.eventId);
  UserEvent.findByIdAndDelete(req.params.eventId)
    .then(deletedItem => {
      console.log('item deleted', deletedItem);
      res.send('im done');
    })
    .catch(err => console.log(err));
});

module.exports = router;
