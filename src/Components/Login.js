import React, { useState } from 'react';
import stars from '../Assets/stars.gif';
import {
    userRequest,
    partnerRequest,
    unsyncPartner
} from './requests.js';
import { userColor } from './helpers.js';

const Login = ({ openGrid }) => {
    const startScreen = () => {
        if (localStorage.getItem("userId") && localStorage.getItem("partnerName")) {
            return 2;
        }
        else if (localStorage.getItem("userId")) {
            return 1;
        }
        else {
            return 0;
        }
    }
    const [screen, setScreen] = useState(startScreen);
    const [login, setLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [usercode, setUsercode] = useState("");
    const [partnername, setPartnername] = useState(localStorage.getItem("partnerName"));
    const [partnercode, setPartnercode] = useState("");
    const [syncedpartnername, setSyncedpartnername] = useState("");
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");

    const validateUser = async () => {
        const usercolor = userColor(color);
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
                if (!response.userinfo.partnerid) {
                    localStorage.setItem("userId", response.userinfo.id);
                    setScreen(1);
                }
                else if (response.partnerinfo.id) {
                    localStorage.setItem("userId", response.userinfo.id);
                    localStorage.setItem("partnerName", response.partnerinfo.username);
                    localStorage.setItem("partnerid", response.userinfo.partnerid);
                    openGrid(response.userinfo.userid);
                }
                else {
                    localStorage.setItem("userId", response.userinfo.id);
                    localStorage.setItem("partnerName", response.partnerinfo);
                    setPartnername(response.partnerinfo);
                    setScreen(2);
                }
            }
        }
        else {
            // Create User
            const response = await userRequest('createuser', username, usercode, usercolor);
        }
    }

    const validatePartner = async () => {
        if (partnername.length < 3 && partnercode.length < 3) {
            setMessage("Fields must be at least 3 characters");
        }
        else {
            const response = await partnerRequest(localStorage.getItem("userId"), partnername, partnercode);
            console.log(response);
            if (!response.success) {
                setMessage("Partner not found");
            }
            else {
                localStorage.setItem("partnerName", response.partnerinfo.username);

                    response.partnerinfo.partnerid == localStorage.getItem("userId") ? openGrid() : setScreen(2);

            }
        }
    }

    const syncPartner = () => {
        const partnerSynced = false;
        if (partnerSynced) {
            console.log("sync complete go to main screen");
        }
        else {
            console.log("nope");
        }
        console.log("sync partner");
    }

    const unsync = async () => {
        const response = await unsyncPartner(localStorage.getItem("userId"));
        if (response.success) {
            localStorage.removeItem("partnerName");
            setScreen(1);
        }
    }

    const dontSync = () => {
        console.log("dont sync");
        setScreen(screen - 1);
    }

    return (
            <div className="login-container">
                <div onClick={() => userColor(1)} className="app-title"><img src={stars}/>GoToBedSkat<img src={stars}/></div>
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
