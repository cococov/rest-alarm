'use strict';

/**
 * Print: [hh:mm] _LOG_
 */
const log = (message) => {
  let date = new Date();
  let formatDate = `${date.getHours()}:${date.getMinutes()}`
    .replace(/(\d+):(\d+)/,
      (str, hh, mm) =>
        `${(hh < 10) ? '0' : ''}${hh}:${(mm < 10) ? '0' : ''}${mm}`
    );
  console.log(`[${formatDate}] ${message}`);
};

module.exports = log;