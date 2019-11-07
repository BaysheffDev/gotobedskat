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
    if (!time) {
        return 5;
    }

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

// Return name of color corresponding to input number
const getColor = (color) => {
    switch(color) {
        case 1:
            return "lightblue"
            break;
        case 2:
            return "pink"
            break;
        case 'lightblue':
            return 1;
            break;
        case 'pink':
            return 2;
            break;
        default:
            return "lightblue"
    }
}

// Determin starting screen for login workflow
const startScreen = () => {
    if (localStorage.getItem("userId") && localStorage.getItem("partnerName")) {
        return 2;
    }
    else if (localStorage.getItem("userId")) {
        return 1;
    }
    else {
        return 0;
    }
}

// Organize and package data in an array of objects containing "date", "userTime", "partnerTime"
const organizeGridData = (data) => {
    if (!data.success) {
        return false;
    }
    else {
        const userStartDate = data.userData[0].date.split('T')[0];
        const partnerStartDate = data.partnerData[0].date.split('T')[0];
        const startDate = moment(userStartDate).isSameOrBefore(partnerStartDate) ? moment(userStartDate) : moment(partnerStartDate);
        console.log(startDate);
        let dateTimesArray = [];
        const userDataLength = data.userData.length;
        let userCount = 0;
        const partnerDataLength = data.partnerData.length;
        let partnerCount = 0;
        let currentDate = moment(startDate).format('YYYY-MM-DD');
        let helpcheck = 0;

        while (helpcheck < 50 && userCount < userDataLength && partnerCount < partnerDataLength) {
            const userCheck = userCount < userDataLength;
            const partnerCheck = partnerCount < partnerDataLength;
            const dateTimeObj = {
                'date': currentDate,
                'userTime': "",
                'partnerTime': ""
            };
            if (userCheck && moment(data.userData[userCount].date.split('T')[0]).isSame(currentDate)) {
                dateTimeObj['userTime'] = data.userData[userCount].bedtime;
                userCount++;
            }
            if (partnerCheck && moment(data.partnerData[partnerCount].date.split('T')[0]).isSame(currentDate)) {
                dateTimeObj['partnerTime'] = data.partnerData[partnerCount].bedtime;
                partnerCount++;
            }
            dateTimesArray.push(dateTimeObj);
            currentDate = moment(currentDate).add(1, 'days').format('YYYY-MM-DD');
            helpcheck++;
        }
        // setDateTimes(dateTimesArray);
        console.log("dateTimesArray: ", dateTimesArray);
        return dateTimesArray;
    }
}


export {
  calendar,
  getTime,
  getBarWidth,
  getColor,
  startScreen,
  organizeGridData
}
