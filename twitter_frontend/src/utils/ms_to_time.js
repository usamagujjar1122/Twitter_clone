exports.msToTime = (ms) => {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24))
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  if (days > 0) {
    return days + "d"
  } else if (hours > 0) {
    return hours + "h"
  } else if (minutes > 0) {
    return minutes + "m"
  } else if (seconds > 0) {
    return seconds + "s"
  } else {
    return 'Now'
  }
};