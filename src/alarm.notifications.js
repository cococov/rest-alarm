'use strict';

const path = require('path');
const notifier = require('node-notifier');
const player = require('play-sound')();

class NotificationHandler {

  /* Notification objects */
  #restNotification = ({ workTime, restTime, restTimeLarge, isLarge }) => ({
    title: `Hora de descansar`,
    subtitle: `${restTime} minutos de descanso`,
    message: `Ya has trabajado ${workTime} minutos${isLarge ? ' 4 veces' : ''}, es hora de que descanses ${isLarge ? restTimeLarge : restTime} minutos alejado de la pantalla.`,
    icon: path.join(__dirname, '../img/clock.png'),
    sound: false,
    wait: true
  });

  #workNotification = ({ restTime, restTimeLarge, isLarge }) => ({
    title: `¡A trabajar!`,
    subtitle: `Descanso terminado`,
    message: `Ya descansaste ${isLarge ? restTimeLarge : restTime} minutos, es hora de volver a trabajar.`,
    icon: path.join(__dirname, '../img/clock.png'),
    sound: false,
    wait: true
  });

  #initNotification = () => ({
    title: `Rest Alarm iniciado`,
    message: `Aplicación iniciada.`,
    icon: path.join(__dirname, '../img/clock.png'),
    sound: false,
    wait: true
  });

  /* Notification Function*/
  sendNotification = ({ type, callBack, payload }) => {
    player.play('./Notification.mp3');
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