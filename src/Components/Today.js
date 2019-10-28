import React, { useState } from 'react';
import moment from 'moment';
import { getTime, getBarWidth } from './helpers.js';

const Today = ({ userTime, partnerTime, userColor, partnerColor }) => {
    const [entered, setEntered] = useState(userTime);
    const [leftBarWidth, setLeftBarWidth] = useState(userTime ? getBarWidth(userTime) : 5);
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
                    <div style={{color: `${userColor}`}}>{userTime}</div>
                    <div className="day-date-text">{today}</div>
                    <div style={{color: `${partnerColor}`}}>{partnerTime}</div>
                </div>
              <div onClick={() => handelDoubleClick()} className="left">
                <div style={{background: `${userColor}`, width: `${leftBarWidth}%`}} className="day-level-left"></div>
              </div>
              <div className="right">
                <div style={{background: `${partnerColor}`, width: `${rightBarWidth}%`}} className="day-level-right"></div>
              </div>
            </div>
        );
    }
    else {
        return (
            <div onClick={() => updateDay()} className="today-container">
                <div className="today">Go to bed Skat</div>
            </div>
        );
    }
}

export default Today;
