import React, { useState } from 'react';
import moment from 'moment';

const Day = ({ date }) => {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [leftBarWidth, setLeftBarWidth] = useState("");
  const [rightBarWidth, setRightBarWidth] = useState(5);

  const getTime = () => {
    let hour = moment().hour();
    let minute = moment().minute();
    let suffix = 'am';
    if (minute < 10)
      minute = minute + "0";
    if (hour === 0)
      hour = 12;
    if (hour > 12) {
      hour = hour - 12;
      suffix = 'pm';
    }
    const time = hour + ":" + minute + " " + suffix;
    setLeftBarWidth(getBarWidth(hour, minute));
    console.log(time);
    return time;
  }

  const getBarWidth = (hour, minute, suffix) => {
    if (hour < 9 && suffix === 'pm')
      return 1;
    if (hour >= 2 && suffix === 'am')
      return 100;
    const min = minute / 60;
    const hr = hour - 9;
    const width = (hr + min) / 5 * 100;
    console.log(width);
    return width;
  }

  return (
    <div className="day">
      <div onClick={() => setLeft(getTime())} className="left">
        <div style={{background: "lightblue", width: `${leftBarWidth}%`}} className="day-level-left"></div>
        <div className="day-time-left">{left}</div>
      </div>
      <div onClick={() => setRight(getTime())} className="right">
        <div style={{background: "pink", width: `${rightBarWidth}%`}} className="day-level-right"></div>
        <div className="day-time-right">{right}</div>
      </div>
    </div>
  );
}

export default Day;
