/**
 * hh:mm:ss
 */
const getFormatDate = difference => {
  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let formatDate = `${hours}:${minutes}:${seconds}`
    .replace(/(\d+):(\d+):(\d+)/,
      (str, hh, mm, ss) =>
        `${(hh < 10) ? '0' : ''}${hh}:${(mm < 10) ? '0' : ''}${mm}:${(ss < 10) ? '0' : ''}${ss}`
    );

  return formatDate;
};

module.exports = { getFormatDate };