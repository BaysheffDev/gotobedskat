import React, { useState } from 'react';
import moment from 'moment';
import { getBarWidth } from './helpers.js';

const Day = ({ dateTime, userColor, partnerColor }) => {
  const [left, setLeft] = useState(dateTime.userTime);
  const [right, setRight] = useState(dateTime.partnerTime);
  const [leftBarWidth, setLeftBarWidth] = useState(getBarWidth(dateTime.userTime));
  const [rightBarWidth, setRightBarWidth] = useState(getBarWidth(dateTime.partnerTime));
  const [today] = useState(moment(dateTime.date).format("ddd DD-MM"));

  return (
    <div className="day">
        <div className="day-date">
            <div style={{color: `${userColor}`}}>{left}</div>
            <div className="day-date-text">{today}</div>
            <div style={{color: `${partnerColor}`}}>{right}</div>
        </div>
      <div onClick={() => console.log("Clicked")} className="left">
        <div style={{background: `${userColor}`, width: `${leftBarWidth}%`}} className="day-level-left"></div>
      </div>
      <div className="right">
        <div style={{background: `${partnerColor}`, width: `${rightBarWidth}%`}} className="day-level-right"></div>
      </div>
    </div>
  );
}

export default Day;
