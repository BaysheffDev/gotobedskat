import moment from 'moment';

const calendar = (startDate) => {
  const today = moment().format("YYYY-MM-DD");
  let day = {
              date: startDate,
              userTime: "10:15pm",
              partnerTime: "11:23pm"
             };
  const dates = [];
  if (startDate === today)
    return [today];
  while (day.date !== today) {
    dates.push(day);
    day = {
            date: moment(day.date).add(1, 'day').format("YYYY-MM-DD"),
            userTime: "10:15pm",
            partnerTime: "11:23pm"
           };
  }
  console.log(dates);
  return dates;
  // console.log("OK");
}

// Returns current time with am/pm suffix
const getTime = () => {
  let hour = moment().hour();
  let minute = moment().minute();
  let suffix = 'am';
  if (minute < 10)
    minute = "0" + minute;
  if (hour === 0)
    hour = 12;
  if (hour > 12) {
    hour = hour - 12;
    suffix = 'pm';
  }
  const time = hour + ":" + minute;

  return time;
}

// Accepts: time in format: 8:20pm |
// First hour to record sleep time |
// last hour on display |
// duration of hours on display |
// if the final time on display ends at a half hour
// Returns: width % for the days bar display
const getBarWidth = (time, firstHour, lastHour, duration, halfHour, ) => {
    const splitTime = time.split(":");
    const hour = splitTime[0];
    const rest = splitTime[1];
    const digits = /[0-9]/g;
    const alpha = /[a-zA-Z]/g;
    let minute = rest.match(digits);
    minute = minute.join("");
    let suffix = rest.match(alpha);
    suffix = suffix.join("");
    console.log("hour: ", hour);
    console.log("minute: ", minute);
    console.log("suffix: ", suffix);

    if (hour < firstHour && suffix === 'pm')
        return 5;
    if (halfHour) {
        if (hour >= lastHour && hour < lastHour + 1 && minute >= 30 && suffix === 'am')
            return 100;
    }
    else {
        if (hour >= lastHour)
            return 100;
    }
    const min = minute / 60;
    const hr = hour - 9;
    const width = (hr + min) / duration * 100;
    console.log(width);

    return width;
}

export {
  calendar,
  getTime,
  getBarWidth,
}
