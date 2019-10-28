import moment from 'moment';

// Generate testing data
const calendar = (startDate) => {
  const lastSetDate = moment().hour() > 5 ?
                      moment().subtract(1, 'day').format("YYYY-MM-DD") :
                      moment().subtract(2, 'day').format("YYYY-MM-DD");
  let day = {
      date: startDate,
      userTime: "10:15pm",
      partnerTime: "11:23pm"
  };
  const dates = [];
  if (startDate === lastSetDate)
    return [lastSetDate];
  while (day.date !== lastSetDate) {
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


// If moment().hour() < 6am stop data at 2 days before
// If momnent().hour() > 5am stop data at yesterday

// Get calendar data
const getData = () => {
    fetch('http://localhost:3001/', {
        method: 'get',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    console.log("data");
}

// If moment().hour() <= 23 set Today
// If moment().hour() >= 0 set Yesterday

// Get calendar data
const sendData = () => {
    fetch('http://localhost:3001/', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            user: "",
            date: "",
            time: ""
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    console.log("data");
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
  const time = hour + ":" + minute + suffix;

  return time;
}

// Accepts: time in format: 8:20pm |
// Returns: width % for the days bar display
const getBarWidth = (time) => {
    // Hard coded parameters to match the hours displayed on UI
    const firstHour = 8;
    const lastHour = 2;
    const duration = 6.5;
    const halfHour = true;

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
    const hr = hour - firstHour;
    const width = (hr + min) / duration * 100;
    console.log(width);

    return width;
}

export {
  calendar,
  getTime,
  getBarWidth,
}
