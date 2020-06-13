'use strict';

const notifications = require('./alarm.notifications');
const log = require('./log');

const {
  restNotification,
  workNotification,
  sendNotification
} = notifications;

/* Work timer */
const workTimer = async (time) => {
  const { workTime, restTime } = time;
  const timeout = workTime * 60 * 1000;

  setTimeout(() => {
    sendNotification(
      restNotification(workTime, restTime),
      () => {
        log('_REST_');
        restTimer(time);
      }
    );
  }, timeout);
};

/* Rest timer */
const restTimer = async (time) => {
  const { restTime } = time;
  const timeout = restTime * 60 * 1000;

  setTimeout(() => {
    sendNotification(
      workNotification(restTime),
      () => {
        log('_WORK_');
        workTimer(time);
      }
    );
  }, timeout);
};

module.exports = {
  workTimer,
  restTimer
}