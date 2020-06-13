'use strict';

const notifications = require('./alarm.notifications');
const timers = require('./alarm.timers');
const fs = require('fs').promises;
const setup = require('./setup');
const log = require('./log');
const util = require('util');

const { initNotification, sendNotification } = notifications;
const { workTimer } = timers;

const args = process.argv.slice(2);
let settings = {};
let begginTime = 0;

/* _INIT_ */
const init = async () => {

  if (args[0] === 'setup')
    settings = await setup();

  try {
    let settingsFile = await fs.readFile('settings.json');
    settings = JSON.parse(settingsFile);
    console.log('\nsettings.json loaded...');
    !args[0] && console.log('[run the app with `npm run setup` to change the settings]');
  } catch (err) {
    settings = await setup();
  };

  console.log('\n-----------------\n');

  const { workTime, restTime, language } = settings;

  sendNotification(
    initNotification(),
    () => {
      begginTime = (new Date).getTime();
      log('_INIT_');
      log('_WORK_');
      workTimer({ workTime, restTime });
    }
  );
};

init();

// TODO: Implements localization (using good practices)
// TODO: Implement total working time and total time