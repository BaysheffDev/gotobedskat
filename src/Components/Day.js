import React, { useState } from 'react';
import moment from 'moment';
import { getBarWidth } from './helpers.js';

const Day = ({ dateTime }) => {
  const [left, setLeft] = useState(dateTime.userTime);
  const [right, setRight] = useState(dateTime.partnerTime);
  const [leftBarWidth, setLeftBarWidth] = useState(getBarWidth(dateTime.userTime));
  const [rightBarWidth, setRightBarWidth] = useState(getBarWidth(dateTime.partnerTime));
  const [today] = useState(moment(dateTime.date).format("ddd DD-MM"));

  return (
    <div className="day">
        <div className="day-date">
            <div className={left ? "day-time-left" : ""}>{left}</div>
            <div className="day-date-text">{today}</div>
            <div className={right ? "day-time-right" : ""}>{right}</div>
        </div>
      <div onClick={() => console.log("Clicked")} className="left">
        <div style={{background: "lightblue", width: `${leftBarWidth}%`}} className="day-level-left"></div>
      </div>
      <div className="right">
        <div style={{background: "pink", width: `${rightBarWidth}%`}} className="day-level-right"></div>
      </div>
    </div>
  );
}

export default Day;
