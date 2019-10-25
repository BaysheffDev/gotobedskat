import React, { useState } from 'react';
import moment from 'moment';
import { getBarWidth } from './helpers.js';

const Day = ({ dateTime }) => {
  const [left, setLeft] = useState(dateTime.userTime);
  const [right, setRight] = useState(dateTime.partnerTime);
  const [leftBarWidth, setLeftBarWidth] = useState(getBarWidth(dateTime.userTime, 9, 2, 5.5, true));
  const [rightBarWidth, setRightBarWidth] = useState(getBarWidth(dateTime.partnerTime, 9, 2, 5.5, true));

  return (
    <div className="day">
      <div onClick={() => console.log("Clicked")} className="left">
        <div style={{background: "lightblue", width: `${leftBarWidth}%`}} className="day-level-left"></div>
        <div className={left ? "day-time-left" : ""}>{left}</div>
      </div>
      <div className="right">
        <div style={{background: "pink", width: `${rightBarWidth}%`}} className="day-level-right"></div>
        <div className={right ? "day-time-right" : ""}>{right}</div>
      </div>
    </div>
  );
}

export default Day;
