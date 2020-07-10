'use strict';

const NotificationHandler = require('./alarm.notifications');
const TimerHandler = require('./alarm.timers');
const readline = require('readline');
const fs = require('fs').promises;
const setup = require('./setup');
const log = require('./log');
const { getFormatDate } = require('./utils');

var ARGS = process.argv.slice(2);

if (ARGS[0] === 'help' || ARGS[0] === 'h') {
  console.log('\n');
  console.log('rest-alarm [help h]: Help');
  console.log('rest-alarm [setup s]: run setup first');
  console.log('\n');
  process.exit();
}


class main {
  #_settings;
  #_notificationHandler;
  #_timerHandler;
  #_beginTime;

  constructor() {
    this.#_settings = {};
    this.#_notificationHandler = new NotificationHandler();
    this.#_timerHandler = new TimerHandler();
    this.#_beginTime = 0;
    this.#initKeyListener();
  }

  /* _INIT_ */
  init = async ({ isWithSetup }) => {

    console.clear();

    if (isWithSetup)
      this.#_settings = await setup();

    try {
      let settingsFile = await fs.readFile('settings.json');
      this.#_settings = JSON.parse(settingsFile);
      console.log('\nsettings.json loaded...');
      console.log(`\nSetup: 'ctrl + s'`);
      console.log(`Exit: 'ctrl + q'`);
    } catch (err) {
      this.#_settings = await setup();
    };


    console.log('\n-----------------\n');

    const { workTime, restTime, language } = this.#_settings;

    let callBack = () => {
      this.#_beginTime = (new Date).getTime();
      log('_INIT_'); log('_WORK_');
      this.#_timerHandler.startTimer({ workTime, restTime });
    };

    this.#keyListener();
    this.#_notificationHandler.sendNotification({ type: 'INIT', callBack });
  };

  /* _STOP_ */
  stop = () => {
    process.stdin.pause();
    this.#_beginTime = 0;
    this.#_timerHandler.stopTimer();
  };

  /* Key listener for exit and stuff */
  #initKeyListener = async () => {
    readline.emitKeypressEvents(process.stdin);

    process.stdin.setRawMode(true);

    let callBack = (str, key) => {
      if (key.ctrl) {
        switch (key.name) {
          case 'q':
            let finishTime = (new Date).getTime();
            let workedTime = finishTime - this.#_beginTime;
            let formattedWorkedTime = getFormatDate(workedTime);
            console.log(`\n\nWorked Time: ${formattedWorkedTime}\n\n`);
            process.exit();
          case 's':
            this.stop();
            this.init({ isWithSetup: true });
            break;
        }
      }
    }

    process.stdin.on('keypress', callBack);
  };

  #keyListener = async () => {
    process.stdin.resume();
    process.stdin.setRawMode(true);
  };

}

var application = new main();

application.init({ isWithSetup: (ARGS[0] === 'setup' || ARGS[0] === 's') });


// TODO: Implements localization