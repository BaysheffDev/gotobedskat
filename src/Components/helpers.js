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
    const hour = parseInt(splitTime[0]);
    const rest = splitTime[1];
    const digits = /[0-9]/g;
    const alpha = /[a-zA-Z]/g;
    let minute = rest.match(digits);
    minute = parseInt(minute.join(""));
    let suffix = rest.match(alpha);
    suffix = suffix.join("");
    if ((hour < firstHour && suffix === 'pm') || (hour > 6 && suffix === 'am'))
        return 5;
    if (halfHour) {
        if (hour >= lastHour && hour < lastHour + 1 && minute >= 30 && suffix === 'am')
            return 100;
    }
    else {
        if (hour >= lastHour)
            return 100;
    }
    let hr = 0;
    if (hour < 12 && suffix === 'am') {
      hr = 12 - firstHour + hour;
    }
    else {
      hr = hour - firstHour;
      console.log("2: ", hr);
    }
    const min = minute / 60;
    const width = (hr + min) / duration * 100;
console.log(width);
    return width;
}

// Return name of color corresponding to input number
const getColor = (color) => {
    switch(color) {
        case 1:
            return "lightblue"
        case 2:
            return "pink"
        case 'lightblue':
            return 1;
        case 'pink':
            return 2;
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
        let yesterday = moment().format('YYYY-MM-DD');
        const userStartDate = data.userData[0].date;
        const partnerStartDate = data.partnerData[0].date;
        const startDate = moment(userStartDate).isSameOrBefore(partnerStartDate) ? moment(userStartDate) : moment(partnerStartDate);
        let datesTimesArray = [];
        const userDataLength = data.userData.length;
        let userCount = 0;
        const partnerDataLength = data.partnerData.length;
        let partnerCount = 0;
        let currentDate = moment(startDate).format('YYYY-MM-DD');
        if (moment().hour() < 6) {
            yesterday = moment(yesterday).subtract(2, 'days');
        }
        else if (moment().hour() > 5) {
            yesterday = moment(yesterday).subtract(1, 'days');
        }
        else {
            yesterday = moment(yesterday).subtract(1, 'days');
        }

        while (moment(currentDate).isSameOrBefore(yesterday)) {
            const userCheck = userCount < userDataLength;
            const partnerCheck = partnerCount < partnerDataLength;
            const dateTimeObj = {
                'date': currentDate,
                'userTime': "",
                'partnerTime': ""
            };
            if (userCheck && moment(data.userData[userCount].date).isSame(currentDate)) {
                dateTimeObj['userTime'] = data.userData[userCount].bedtime;
                userCount++;
            }
            if (partnerCheck && moment(data.partnerData[partnerCount].date).isSame(currentDate)) {
                dateTimeObj['partnerTime'] = data.partnerData[partnerCount].bedtime;
                partnerCount++;
            }
            datesTimesArray.push(dateTimeObj);
            currentDate = moment(currentDate).add(1, 'days').format('YYYY-MM-DD');
        }
        const today = {"userTodayTime": "", "partnerTodayTime": ""};
        const userLastDate = data.userData[data.userData.length - 1].date;
        const partnerLastDate = data.partnerData[data.partnerData.length - 1].date;
        if (moment(userLastDate).isSame(moment(yesterday).add(1, 'days').format('YYYY-MM-DD'))) {
            today.userTodayTime = data.userData[data.userData.length - 1].bedtime;
        }
        if (moment(partnerLastDate).isSame(moment(yesterday).add(1, 'days').format('YYYY-MM-DD'))) {
            today.partnerTodayTime = data.partnerData[data.partnerData.length - 1].bedtime;
        }
        return {'datesTimesArray': datesTimesArray, 'today': today};
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
