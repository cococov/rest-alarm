'use strict';

const notifications = require('./alarm.notifications');
const timers = require('./alarm.timers');
const readline = require('readline');
const fs = require('fs').promises;
const setup = require('./setup');
const log = require('./log');
const util = require('util');

const { initNotification, sendNotification } = notifications;
const { workTimer } = timers;

const args = process.argv.slice(2);
let settings = {};
let begginTime = 0;

/* const quitListener = () => {


}; */

/* _INIT_ */
const init = async () => {

  console.clear();

  if (args[0] === 'setup')
    settings = await setup();

  try {
    let settingsFile = await fs.readFile('settings.json');
    settings = JSON.parse(settingsFile);
    console.log('\nsettings.json loaded...');
    !args[0] && console.log('\n[run the app with `npm run setup` to change the settings]');
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

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'q') {
    process.exit();
  } else {
    console.log(`You pressed the "${str}" key`);
    console.log();
    console.log(key);
    console.log();
  }
});