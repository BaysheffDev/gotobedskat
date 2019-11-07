import React, { useState, useEffect } from 'react';
import stars from '../Assets/stars.gif';
import {
    userRequest,
    partnerRequest,
    unsyncPartner,
    checkSync
} from './requests.js';
import { getColor, startScreen } from './helpers.js';

const Login = ({ openGrid }) => {
    const [screen, setScreen] = useState(startScreen());
    const [login, setLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [usercode, setUsercode] = useState("");
    const [partnername, setPartnername] = useState(localStorage.getItem("partnerName"));
    const [partnercode, setPartnercode] = useState("");
    const [syncedpartnername, setSyncedpartnername] = useState("");
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (screen === 2) {
        // Check if partner has synced back every 10 seconds
        // setTimeout(async () => {
        //   const response = await checkSync('checksync', localStorage.getItem("userId"));
        //   console.log(count + " " + JSON.stringify(response));
        //   setCount(count + 1);
        // }, 10000);
        checkPartnerSync();
      }
    })

    const checkPartnerSync = async () => {
        const response = await checkSync('checksync', localStorage.getItem("userId"));
        if (response.success) {
            localStorage.setItem("partnerId", response.partnerid);
            openGrid();
        }
    }

    const validateUser = async () => {
        const usercolor = getColor(color);
        if (username.length < 3 && usercode.length < 3) {
            setMessage("Fields must be at least 3 characters");
        }
        else if (!color && !login) {
            setMessage("Please select a color");
        }
        else if (login) {
            // Login user
            const response = await userRequest('loginuser', username, usercode);
            if (!response.success) {
                setMessage("Invalid Credentials");
            }
            else {
                let logIntoGrid = false;
                if (!response.userinfo.partnerid) {
                    setScreen(1);
                }
                else if (response.partnerinfo.partnerid === response.userinfo.id) {
                    logIntoGrid = true;
                }
                else {
                    localStorage.setItem("partnerName", response.partnerinfo.username);
                    localStorage.setItem("partnerColor", response.partnerinfo.usercolor);
                    setPartnername(response.partnerinfo.username);
                    setScreen(2);
                }
                localStorage.setItem("userId", response.userinfo.id);
                localStorage.setItem("userName", response.userinfo.username);
                localStorage.setItem("userColor", response.userinfo.usercolor);
                localStorage.setItem("userCode", response.userinfo.usercode);
                setMessage("");
                if (logIntoGrid) {
                    localStorage.setItem("partnerId", response.partnerinfo.partnerid);
                    localStorage.setItem("partnerName", response.partnerinfo.username);
                    localStorage.setItem("partnerColor", response.partnerinfo.usercolor);
                    openGrid(response.userinfo.userid);
                }
            }
        }
        else {
            // Create User
            const response = await userRequest('createuser', username, usercode, usercolor);
            localStorage.setItem("userId", response.id);
            localStorage.setItem("userName", response.username);
            localStorage.setItem("userCode", response.usercode);
            setScreen(1);
        }
    }

    const validatePartner = async () => {
        if (partnername.length < 3 && partnercode.length < 3) {
            setMessage("Fields must be at least 3 characters");
        }
        else {
            const response = await partnerRequest(localStorage.getItem("userId"), partnername, partnercode);
            if (!response.success) {
                setMessage("Partner not found");
            }
            else {
                localStorage.setItem("partnerId", response.partnerinfo.id);
                localStorage.setItem("partnerName", response.partnerinfo.username);
                localStorage.setItem("partnerColor", response.partnerinfo.usercolor);
                response.partnerinfo.partnerid == localStorage.getItem("userId") ? openGrid() : setScreen(2);
            }
        }
    }

    const unsync = async () => {
        const response = await unsyncPartner(localStorage.getItem("userId"));
        if (response.success) {
            localStorage.removeItem("partnerName");
            setScreen(1);
        }
    }

    return (
            <div className="login-container">
                <div onClick={() => getColor(1)} className="app-title"><img src={stars}/>GoToBedSkat<img src={stars}/></div>
                <div className="app-title-underline"></div>
                <input onChange={(e) => setUsername(e.target.value)} style={{display: screen === 0 ? "" : "none"}} className="login-field" type="text" placeholder="username" />
                <input onChange={(e) => setUsercode(e.target.value)} style={{display: screen === 0 ? "" : "none"}} className="login-field" type="text" placeholder="code" />
                <input onChange={(e) => setPartnername(e.target.value)} style={{display: screen === 1 ? "" : "none"}} className="login-field" type="text" placeholder="partnername" />
                <input onChange={(e) => setPartnercode(e.target.value)} style={{display: screen === 1 ? "" : "none"}} className="login-field" type="text" placeholder="partnercode" />
                <div style={{display: screen === 0 && !login ? "" : "none"}} className="login-colors-container">
                    <div onClick={() => setColor(1)} style={{border: '2px solid lightblue'}} className="login-color">
                        <div className={color === 1 ? "login-color-inner color-one" : ""}></div>
                    </div>
                    <div onClick={() => setColor(2)} style={{border: '2px solid pink'}} className="login-color">
                        <div className={color === 2 ? "login-color-inner color-two" : ""}></div>
                    </div>
                </div>
                <div style={{display: screen === 2 ? "" : "none"}} className="login-partner-message">Waiting for {partnername} to sync... <br /><br /> Go back if you wish to cancel</div>
                <div className="login-submit-container">
                    <button style={{display: screen === 0 ? "" : "none"}} onClick={() => validateUser()} className="login-submit-button plus">+</button>
                    <button style={{display: screen === 1 ? "" : "none"}} onClick={() => validatePartner()} className="login-submit-button plus">+</button>
                    <button style={{display: screen === 1 ? "" : "none"}} onClick={() => {setScreen(0); localStorage.clear() }} className="login-submit-button back">&lt;</button>
                    <button style={{display: screen === 2 ? "" : "none"}} onClick={() => unsync()} className="login-submit-button back">&lt;</button>
                </div>
                <div className="login-message-container">{message}</div>
                <div style={{display: screen === 0 ? "" : "none"}} className="login-buttons">
                    <button onClick={() => setLogin(true)} className={login ? "login-button-left" : ""}>Login</button>
                    <button onClick={() => setLogin(false)} className={login ? "" : "login-button-right"}>Create User</button>
                </div>
            </div>
    );
}

export default Login;
