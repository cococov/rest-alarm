'use strict';

const NotificationHandler = require('./alarm.notifications');
const log = require('./log');

class TimerHandler {
  #_notificationHandler;
  #_time;
  #_workTimeoutRef;
  #_restTimeoutRef;

  constructor() {
    this.#_notificationHandler = new NotificationHandler();
    this.#_time = {};
    this.#_workTimeoutRef = null;
    this.#_restTimeoutRef = null;
  };

  /* Work timer */
  #workTimer = async () => {
    const { workTime } = this.#_time;
    const timeout = workTime * 60 * 1000;

    this.#_workTimeoutRef = setTimeout(() => {
      this.#_notificationHandler
        .sendNotification({
          type: 'REST',
          callBack: () => { log('_REST_'); this.#restTimer(); },
          payload: this.#_time
        });
    }, timeout);
  };

  /* Rest timer */
  #restTimer = async () => {
    const { restTime } = this.#_time;
    const timeout = restTime * 60 * 1000;

    this.#_restTimeoutRef = setTimeout(() => {
      this.#_notificationHandler
        .sendNotification({
          type: 'WORK',
          callBack: () => { log('_WORK_'); this.#workTimer(); },
          payload: this.#_time
        });
    }, timeout);
  };

  /* START */
  startTimer = time => {
    this.#_time = time;
    this.#workTimer();
  };

  /* STOP */
  stopTimer = () => {
    clearTimeout(this.#_workTimeoutRef);
    clearTimeout(this.#_restTimeoutRef);
  };

}
module.exports = TimerHandler;