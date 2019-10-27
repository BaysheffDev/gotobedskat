import React, { useState } from 'react';
import moment from 'moment';
import { getTime, getBarWidth } from './helpers.js';

const Today = ({ partnerTime}) => {
    const [entered, setEntered] = useState(false);
    const [leftBarWidth, setLeftBarWidth] = useState(5);
    const [rightBarWidth] = useState(5);
    const [today] = useState(moment().format("ddd DD-MM"));
    const [time, setTime] = useState();


    if (entered) {
        return (
            <div className="day day-today">
                <div className="day-date">
                    <div className="day-time-left">{time}</div>
                    <div className="day-date-text">{today}</div>
                    <div className="day-time-right">{partnerTime}</div>
                </div>
              <div onClick={() => console.log("OK")} className="left">
                <div style={{background: "lightblue", width: `${leftBarWidth}%`}} className="day-level-left"></div>
              </div>
              <div className="right">
                <div style={{background: "pink", width: `${rightBarWidth}%`}} className="day-level-right"></div>
              </div>
            </div>
        )
    }
    else {
        return (
            <div onClick={() => {setTime(getTime()); setEntered(true); setLeftBarWidth(getBarWidth(getTime()))}} className="today-container">
                <div className="today">Go to sleep Skat</div>
            </div>
        );
    }
}

export default Today;
