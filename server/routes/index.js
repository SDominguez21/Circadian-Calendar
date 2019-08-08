const express = require('express');
const router = express.Router();
const request = require('request');
const rp = require('request-promise');
const Event = require('../models/Event');
const User = require('../models/User');

/* GET home page */
router.get('/', (req, res, next) => {
  res.json({ message: "it's ok" });
});

router.get('/allCallsForMonth', async (req, res, next) => {
  console.log('hello you rang?');

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
    startDate: { $gte: '07/01/2019', $lte: '12/31/2019' }
  }).then(results => {
    console.log('!!!!!!!!', results);
    cosmicEvent.push(...results);
  });

  console.log('88888888888', cosmicEvent);
  res.send({
    weather: weather,
    moon: moon,
    cosmic: cosmicEvent
  });
});

router.get('/userEvent', (req, res, next) => {
  console.log("hey what's up");
});

module.exports = router;
