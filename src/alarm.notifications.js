'use strict';

const path = require('path');
const notifier = require('node-notifier');

class NotificationHandler {

  /* Notification objects */
  #restNotification = ({ workTime, restTime }) => ({
    title: `Hora de descansar`,
    subtitle: `${restTime} minutos de descanso`,
    message: `Ya has trabajado ${workTime} minutos, es hora de que descanses ${restTime} minutos alejado de la pantalla.`,
    icon: path.join(__dirname, '../img/clock.png'),
    sound: true,
    wait: true
  });

  #workNotification = ({ restTime }) => ({
    title: `¡A trabajar!`,
    subtitle: `Descanso terminado`,
    message: `Ya descansaste ${restTime} minutos, es hora de volver a trabajar.`,
    icon: path.join(__dirname, '../img/clock.png'),
    sound: true,
    wait: true
  });

  #initNotification = () => ({
    title: `Rest Time iniciado`,
    message: `Aplicación iniciada.`,
    icon: path.join(__dirname, '../img/clock.png'),
    sound: true,
    wait: true
  });

  /* Notification Function*/
  sendNotification = ({ type, callBack, payload }) => {
    switch (type) {
      case 'INIT':
        notifier.notify(this.#initNotification(), callBack);
        break;
      case 'REST':
        notifier.notify(this.#restNotification(payload), callBack);
        break;
      case 'WORK':
        notifier.notify(this.#workNotification(payload), callBack);
        break;
    }
  };

}

module.exports = NotificationHandler;