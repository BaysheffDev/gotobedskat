import React, { useState } from 'react';
import { getColor } from './helpers.js';
import { changeSettingRequest } from './requests.js';

const Sidemenu = ({ slide, toggleSideMenu, logout, userName, userCode, userColor, updateGridSetting }) => {
    const [color, setColor] = useState(getColor(userColor));
    const [message, setMessage] = useState("");

    const changeSetting = async (setting, value) => {
      let endpoint = setting;
      if (setting === 'color') {
        endpoint = getColor(color);
      }
      const request = await changeSettingRequest(setting, value);
      if (request.success) {
        localStorage.setItem(setting, request.setting);
        updateGridSetting(setting, request.setting);
        setMessage("Successfully updated setting");
      }
    }

    return (
        <div className="sidemenu-container">
            <div onClick={() => toggleSideMenu()} className={"sidemenu-overlay " + (slide ? "overlay-open" : "")}></div>
            <div className={"sidemenu " + (slide ? "sidemenu-open" : "")}>
                <div className="sidemenu-field-container">
                    <div className="sidemenu-field-label">Change name</div>
                    <div className="sidemenu-input-container">
                        <input type="text" placeholder="Name"/>
                        <button>Submit</button>
                    </div>
                </div>
                <div className="sidemenu-field-container">
                    <div className="sidemenu-field-label">Change code</div>
                    <div className="sidemenu-input-container">
                        <input type="text" placeholder="Code"/>
                        <button>Submit</button>
                    </div>
                </div>
                <div className="sidemenu-field-container">
                    <div className="sidemenu-field-label">Change color</div>
                    <div className="sidemenu-input-container">
                        <div className="login-colors-container">
                            <div onClick={() => setColor(1)} style={{border: '2px solid lightblue'}} className="login-color">
                                <div className={color === 1 ? "login-color-inner color-one" : ""}></div>
                            </div>
                            <div onClick={() => setColor(2)} style={{border: '2px solid pink'}} className="login-color">
                                <div className={color === 2 ? "login-color-inner color-two" : ""}></div>
                            </div>
                        </div>
                        <button>Submit</button>
                    </div>
                </div>
                <div className="sidemenu-field-container">
                    <button onClick={() => logout()} className="logout-button">Logout</button>
                </div>
                <div className="sidemenu-bottom-note">
                    For Lest &#60;3
                </div>
            </div>
        </div>
    );
}

export default Sidemenu;
