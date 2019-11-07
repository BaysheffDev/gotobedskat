import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Day from './Day.js';
import Today from './Today.js';
import Sidemenu from './Sidemenu.js';
import data from '../data.js';
import {calendar} from './helpers.js';
import {
    unsyncPartner,
    checkSync
} from './requests.js';

const Grid = ({ logout }) => {
  // const [dates, setTodayDates] = useState(calendar(moment().format('YYYY-MM-DD')));
  const [datesTimes] = useState(data.sleepData);
  const [userInfo] = useState(data.userInfoData);

  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userCode, setUserCode] = useState(localStorage.getItem("userCode"));
  const [userColor, setUserColor] = useState(localStorage.getItem("userColor"));
  const [partnerName, setPartnerName] = useState(localStorage.getItem("partnerName"));
  const [partnerColor, setPartnerColor] = useState(localStorage.getItem("partnerColor"));

  const [sideMenu, setSideMenu] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
      bottomRef.current.scrollIntoView();
      console.log("OKOK");
      checkStillSynced();
  });

  const checkStillSynced = async () => {
      const response = await checkSync('checksync', localStorage.getItem("userId"));
      console.log(JSON.stringify(response));
      console.log("yep");
      if (!response.success) {
          logout();
      }
  }

  const toggleSideMenu = () => {
      setSideMenu(!sideMenu);
  }

  const updateGridSetting = (setting, value) => {
    switch(setting) {
      case 'username':
        setUserName(value);
        break;
      case 'usercode':
        setUserCode(value);
        break;
      case 'usercolor':
        setUserColor(value);
        break;
    }
  }

  return (
    <div className="container">
        <div onClick={() => toggleSideMenu()} className="menu-button">
          <div className="menu-button-icon">
            =
          </div>
        </div>
        <Sidemenu
          slide={sideMenu}
          toggleSideMenu={toggleSideMenu}
          logout={logout}
          userName={userName}
          userCode={userCode}
          userColor={userColor}
          updateGridSetting={updateGridSetting}
        />
      <div className="header">
        <div className="header-hours">
          {['2am', '1am', '12am', '11pm', '10pm', '9pm', '8pm', '9pm', '10pm', '11pm', '12pm', '1am', '2am'].map((hour, key) =>
          <div key={key} className="header-hour">{hour}</div>
          )}
        </div>
      </div>
      <div className="footer">
        <div className="footer-hours">
          {['2am', '1am', '12am', '11pm', '10pm', '9pm', '8pm', '9pm', '10pm', '11pm', '12pm', '1am', '2am'].map((hour, key) =>
          <div key={key} className="footer-hour">{hour}</div>
          )}
        </div>
      </div>
      <div className="header-spacer"></div>
      <div className="day beginning-component">
          <div style={{color: `${userColor}`}} className="beginning-component-left">{userName}</div>
          <div> | </div>
          <div style={{color: `${partnerColor}`}} className="beginning-component-right">{partnerName}</div>
      </div>
        {datesTimes.map((dateTime, key) =>
          <div className="day-container" key={key}>
            <Day dateTime={dateTime} userColor={userColor} partnerColor={partnerColor} />
          </div>
        )}
        {moment().hour() > 5 && moment().hour() < 18 ? "" : <Today userTime={""} partnerTime={"12:30am"} userColor={userColor} partnerColor={partnerColor} />}
        <div ref={bottomRef} className="footer-spacer"></div>
    </div>
  );
}

export default Grid;
