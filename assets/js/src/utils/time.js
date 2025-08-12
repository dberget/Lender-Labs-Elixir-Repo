export const splitTime = (numberOfHours) => {
  var days = Math.floor(numberOfHours / 24);
  var remainder = numberOfHours % 24;
  var hours = Math.floor(remainder);
  var minutes = Math.floor(60 * (remainder - hours));

  if (days === 0) {
    if (hours < 2 && hours > 0) {
      return `${hours} hr, ${minutes} mins`;
    }

    if (hours === 0) {
      if (minutes < 1) {
        return `Less than 1 minute`;
      }

      return `${minutes} minutes`;
    }

    return `${hours} hours`;
  }

  return `${days} days, ${hours} hours`;
};

export const splitTimeShort = (numberOfHours) => {
  var days = Math.floor(numberOfHours / 24);
  var remainder = numberOfHours % 24;
  var hours = Math.floor(remainder);
  var minutes = Math.floor(60 * (remainder - hours));

  if (days === 0) {
    if (hours < 2 && hours > 0) {
      return `${hours} hr`;
    }

    if (hours === 0) {
      if (minutes < 1) {
        return `now`;
      }

      return `${minutes} mins`;
    }

    return `${hours} hrs`;
  }

  if (days === 1) {
    return `${days} Day`;
  }

  return `${days} Days`;
};
