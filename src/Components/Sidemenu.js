import React, { useState } from 'react';
import { getColor } from './helpers.js';
import { changeSettingRequest, unsyncPartner } from './requests.js';

const Sidemenu = ({ slide, toggleSideMenu, logout, userId, userName, userCode, userColor, updateGridSetting }) => {
    const [userNameText, setUserNameText] = useState("");
    const [userCodeText, setUserCodeText] = useState("");
    const [color, setColor] = useState(getColor(userColor));
    const [message, setMessage] = useState("");


    const updateValue = (field, value) => {
        switch(field) {
            case 1:
                setUserNameText(value);
                break;
            case 2:
                setUserCodeText(value);
                break;
            default:
                console.log("Error updating value");
                break;
        }
    }

    const changeSetting = async (setting, value) => {
        let val = value;
        if (setting === 'usercolor') {
            val = getColor(color);
        }
        else if (value.length < 3) {
            setMessage("3 characters minimum");
            return true;
        }
        const request = await changeSettingRequest(userId, setting, val);
        if (request.success) {
            switch(setting) {
                case "username":
                    setting = 'userName';
                    break;
                case "usercode":
                    setting = 'userCode';
                    break;
                case "usercolor":
                    setting = 'userColor';
                    break;
            }
            localStorage.setItem(setting, request.setting);
            updateGridSetting(setting, request.setting);
            setMessage("Successfully updated setting");
        }
        else {
            setMessage("Failed to update setting");
        }
    }

    const unsync = async () => {
        const response = await unsyncPartner(localStorage.getItem("userId"));
        if (response.success) {
            logout();
        }
    }

    return (
        <div className="sidemenu-container">
            <div onClick={() => toggleSideMenu()} className={"sidemenu-overlay " + (slide ? "overlay-open" : "")}></div>
            <div className={"sidemenu " + (slide ? "sidemenu-open" : "")}>
                <div className="sidemenu-field-container">
                    <div className="sidemenu-field-label">Change name</div>
                    <div className="sidemenu-input-container">
                        <input onChange={(e) => updateValue(1, e.target.value)} type="text" placeholder={userName}/>
                        <button onClick={() => changeSetting('username', userNameText)} >Submit</button>
                    </div>
                </div>
                <div className="sidemenu-field-container">
                    <div className="sidemenu-field-label">Change code</div>
                    <div className="sidemenu-input-container">
                        <input onChange={(e) => updateValue(2, e.target.value)} type="text" placeholder={userCode}/>
                        <button onClick={() => changeSetting('usercode', userCodeText)}>Submit</button>
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
                        <button onClick={() => changeSetting('usercolor', color)}>Submit</button>
                    </div>
                </div>
                <div className="sidemenu-field-container">
                    <button onClick={() => logout()} className="logout-button">Logout</button>
                </div>
                <div className="sidemenu-message">{message}</div>
                <button className="unsync-button" onClick={() => unsync(userId)}>UnsyncPartner</button>
                <div className="sidemenu-bottom-note">
                    For Lest &#60;3
                </div>
            </div>
        </div>
    );
}

export default Sidemenu;
