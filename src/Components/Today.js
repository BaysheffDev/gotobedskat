import React, { useState } from 'react';
import moment from 'moment';
import { getTime, getCorrectDay, getBarWidth } from './helpers.js';
import { sendBedtime } from './requests.js';

const Today = ({ userTime, partnerTime, userColor, partnerColor }) => {
    const [entered, setEntered] = useState(userTime);
    const [leftBarWidth, setLeftBarWidth] = useState(userTime ? getBarWidth(userTime) : 5);
    const [rightBarWidth] = useState(getBarWidth(partnerTime));
    const [today] = useState(moment().format("ddd DD-MM"));
    const [time, setTime] = useState();

    const updateDay = async () => {
        const request = await sendBedtime(
            localStorage.getItem("userId"),
            localStorage.getItem("partnerId"),
            getCorrectDay(),
            getTime(),
        )
        if (request.success) {
            const enteredTime = request.dayInfo.bedtime.split('T')[0];
            setEntered(enteredTime);
            setLeftBarWidth(getBarWidth(enteredTime));
        }
    }

    const getCorrectDay = () => {
        if (moment().hour() <= 23 && moment().hour() > 5) {
            return moment().format('YYYY-MM-DD');
        }
        else {
            return moment().subtract(1, 'days').format('YYYY-MM-DD');
        }
    }

    let count = 0;
    const handelDoubleClick = () => {
        count++;
        setTimeout(() => {
            if (count === 2) {
                updateDay();
            }
            count = 0;
        }, 300);
    }

    if (entered) {
        return (
            <div className="day day-today">
                <div className="day-date">
                    <div style={{color: `${userColor}`}}>{entered}</div>
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
