const notifications = require('./notifications');

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
        console.log('_REST_');
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
        console.log('_WORK_');
        workTimer(time);
      }
    );
  }, timeout);
};

module.exports = {
  workTimer,
  restTimer
}