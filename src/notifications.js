'use strict';

const path = require('path');
const notifier = require('node-notifier');

/* Notification objects */
const restNotification = (workTime, restTime) => ({
  title: `Hora de descansar`,
  subtitle: `${restTime} minutos de descanso`,
  message: `Ya has trabajado ${workTime} minutos, es hora de que descanses ${restTime} minutos alejado de la pantalla.`,
  icon: path.join(__dirname, '../img/clock.png'),
  sound: true,
  wait: true
});

const workNotification = (restTime) => ({
  title: `¡A trabajar!`,
  subtitle: `Descanso terminado`,
  message: `Ya descansaste ${restTime} minutos, es hora de volver a trabajar.`,
  icon: path.join(__dirname, '../img/clock.png'),
  sound: true,
  wait: true
});

const initNotification = () => ({
  title: `Rest Time iniciado`,
  message: `Aplicación iniciada.`,
  icon: path.join(__dirname, '../img/clock.png'),
  sound: true,
  wait: true
});

/* Notification Function*/
const sendNotification = (notification, callBack) => {
  notifier.notify(notification, callBack);
};

module.exports = {
  restNotification,
  workNotification,
  initNotification,
  sendNotification
}