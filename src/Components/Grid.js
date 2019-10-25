import React, { useState } from 'react';
import moment from 'moment';
import Day from './Day.js';
import Today from './Today.js';
import {calendar} from './helpers.js';
// import test2 from './helpers.js';

const Grid = () => {
  // const [dates, setTodayDates] = useState(calendar(moment().format('YYYY-MM-DD')));
  const [datesTimes] = useState(calendar('2019-10-21'));



  return (
    <div className="container">
      <div className="header">
        <div className="header-hours">
          {['2am', '1am', '12am', '11pm', '10pm', '9pm', '10pm', '11pm', '12pm', '1am', '2am'].map((hour, key) =>
          <div key={key} className="header-hour">{hour}</div>
          )}
        </div>
      </div>
      <div className="footer">
        <div className="footer-hours">
          {['2am', '1am', '12am', '11pm', '10pm', '9pm', '10pm', '11pm', '12pm', '1am', '2am'].map((hour, key) =>
          <div key={key} className="footer-hour">{hour}</div>
          )}
        </div>
      </div>
      <div className="header-spacer"></div>
      <div className="menu-button">
        <div className="menu-button-icon">
          =
        </div>
      </div>
        {datesTimes.map((dateTime, key) =>
          <div className="day-container" key={key}>
            <Day dateTime={dateTime} />
          </div>
        )}
        <Today />
        <div className="footer-spacer"></div>
    </div>
  );
}

export default Grid;
