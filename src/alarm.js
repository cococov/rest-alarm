'use strict';

const notifications = require('./notifications');
const timers = require('./timers');
const fs = require('fs').promises;
const setup = require('./setup');
const log = require('./log');
const util = require('util');

const { initNotification, sendNotification } = notifications;
const { workTimer } = timers;

var settings = {};

/* _INIT_ */
const init = async () => {

  try {
    let settingsFile = await fs.readFile('settings.json');
    settings = JSON.parse(settingsFile);
  } catch (err) {
    settings = await setup();
    console.log('\n-----------------\n');
  };

  const { workTime, restTime, language } = settings;

  sendNotification(
    initNotification(),
    () => {
      log('_INIT_');
      log('_WORK_');
      workTimer({ workTime, restTime });
    }
  );
};

init();