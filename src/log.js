'use strict';

const log = (message) => {
  let date = new Date();
  console.log(`${date.getHours()}:${date.getMinutes()} : ${message}`);
};

module.exports = log;