const notifications = require('./notifications');
const timers = require('./timers');

const { initNotification, sendNotification } = notifications;
const { workTimer } = timers;

/* Variables */
const time = {
  workTime: 30,
  restTime: 5
};

/* _INIT_ */
sendNotification(
  initNotification(),
  () => {
    console.log('_INIT_');
    console.log('_WORK_');
    workTimer(time);
  }
);