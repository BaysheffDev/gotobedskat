import React, { useState } from 'react';
import moment from 'moment';
import { getTime, getBarWidth } from './helpers.js';

const Today = ({ partnerTime }) => {
    const [entered, setEntered] = useState(false);
    const [leftBarWidth, setLeftBarWidth] = useState(5);
    const [rightBarWidth] = useState(getBarWidth(partnerTime));
    const [today] = useState(moment().format("ddd DD-MM"));
    const [time, setTime] = useState();
    // const [count, setCount] = useState(0);

    const updateDay = () => {
        setEntered(true);
        setTime(getTime());
        setLeftBarWidth(getBarWidth(getTime()));
        console.log("hey");
    }

    let count = 0;

    const handelDoubleClick = () => {
        count++;
        setTimeout(() => {
            if (count === 2) {
                updateDay();
            }
            count = 0;
            console.log("has a timeout");
        }, 300);
    }

    if (entered) {
        return (
            <div className="day day-today">
                <div className="day-date">
                    <div className="day-time-left">{time}</div>
                    <div className="day-date-text">{today}</div>
                    <div className="day-time-right">{partnerTime}</div>
                </div>
              <div onClick={() => handelDoubleClick()} className="left">
                <div style={{background: "lightblue", width: `${leftBarWidth}%`}} className="day-level-left"></div>
              </div>
              <div className="right">
                <div style={{background: "pink", width: `${rightBarWidth}%`}} className="day-level-right"></div>
              </div>
            </div>
        );
    }
    else {
        return (
            <div onClick={() => updateDay()} className="today-container">
                <div className="today">Go to sleep Skat</div>
            </div>
        );
    }
}

export default Today;
