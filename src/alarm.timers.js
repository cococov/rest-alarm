'use strict';

const NotificationHandler = require('./alarm.notifications');
const log = require('./log');

class TimerHandler {
  #_notificationHandler;
  #_time;
  #_workTimeoutRef;
  #_restTimeoutRef;
  #_cycles;

  constructor() {
    this.#_notificationHandler = new NotificationHandler();
    this.#_workTimeoutRef = null;
    this.#_restTimeoutRef = null;
    this.#_cycles = 0;
    this.#_time = {};
  };

  /* Work timer */
  #workTimer = async () => {
    const { workTime } = this.#_time;
    let timeout = workTime * 60 * 1000;

    this.#_cycles++;

    this.#_workTimeoutRef = setTimeout(() => {
      this.#_notificationHandler
        .sendNotification({
          type: 'REST',
          callBack: () => {
            log((this.#_cycles === 4) ? '_LONG REST_' : '_REST_');
            this.#restTimer();
          },
          payload: { ...this.#_time, isLarge: (this.#_cycles === 4) }
        });
    }, timeout);
  };

  /* Rest timer */
  #restTimer = async () => {
    const { restTime, restTimeLarge } = this.#_time;
    let selectedTime = this.#_cycles === 4 ? restTimeLarge : restTime;
    let timeout = selectedTime * 60 * 1000;

    this.#_restTimeoutRef = setTimeout(() => {
      this.#_notificationHandler
        .sendNotification({
          type: 'WORK',
          callBack: () => {
            log('_WORK_');
            if (this.#_cycles === 4)
              this.#_cycles = 0;
            this.#workTimer();
          },
          payload: { ...this.#_time, isLarge: (this.#_cycles === 4) }
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