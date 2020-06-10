const notifier = require('node-notifier');
const path = require('path');

/* Variables */
var workTime = 30;
var restTime = 5;

/* Notification objects */
const restNotification = {
  title: `Hora de descansar`,
  subtitle: `${restTime} minutos de descanso`,
  message: `Ya has trabajado ${workTime} minutos, es hora de que descanses ${restTime} minutos alejado de la pantalla.`,
  icon: path.join(__dirname, '../img/clock.png'),
  sound: true,
  wait: true
};

const workNotification = {
  title: `¡A trabajar!`,
  subtitle: `Descanso terminado`,
  message: `Ya descansaste ${restTime} minutos, es hora de volver a trabajar.`,
  icon: path.join(__dirname, '../img/clock.png'),
  sound: true,
  wait: true
};

const initNotification = {
  title: `Rest Time iniciado`,
  message: `Aplicación iniciada.`,
  icon: path.join(__dirname, '../img/clock.png'),
  sound: true,
  wait: true
};

/* Notification Function*/
const sendNotification = (notification, callBack) => {
  notifier.notify(notification, callBack);
};

notifier.on('activate', function (notifierObject, options, event) {
  console.log('asd', options);
});

notifier.on('timeout', function (notifierObject, options) {
  console.log(notifierObject);
});

/* Work timer */
const work = async () => {
  setTimeout(() => {
    sendNotification(restNotification,
      (err, action, metadata) => {
        console.log(err, action, metadata);
      });
  }, workTime * 60 * 1000);
};

/* Rest timer */
const rest = async () => {
  setTimeout(() => {
    sendNotification(workNotification,
      (err, action, metadata) => {
        console.log(err, action, metadata);
      });
  }, restTime * 60 * 1000);
};

/* _INIT_ */
sendNotification(initNotification);