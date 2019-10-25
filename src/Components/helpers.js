import moment from 'moment';

const calendar = (startDate) => {
  const today = moment().format("YYYY-MM-DD");
  let date = startDate;
  const dates = [];
  if (startDate === today)
    return [today];
  while (date !== today) {
    dates.push(date);
    date = moment(date).add(1, 'day').format("YYYY-MM-DD");
  }
  console.log(dates);
  return dates;
  // console.log("OK");
}
const test2 = (text) => {
  console.log(text);
}

// export default test;
export {
  calendar,
  test2,
}
