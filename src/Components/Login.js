import React, { useState } from 'react';
import stars from '../Assets/stars.gif';

const Login = () => {
    const [screen, setScreen] = useState(0);
    const [login, setLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [usercode, setUsercode] = useState("");
    const [partnername, setPartnername] = useState("Alex");
    const [partnercode, setPartnercode] = useState("");
    const [syncedpartnername, setSyncedpartnername] = useState("");
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");

    const userColor = (col) => {
        switch(col) {
            case 1:
                return "lightblue"
                break;
            case 2:
                return "pink"
                break;
            default:
                return "lightblue"
        }
    }

    const submitForm = (screen) => {
        if (screen === 0) {
            if (username.length < 3 && usercode.length < 3) {
                setMessage("Fields must be at least 3 characters");
            }
            else if (!color) {
                setMessage("Please select a color");
            }
            else {
                const usercolor = userColor(color);
                const userSignin = (endpoint) => {
                    fetch(`http://localhost:3001/${endpoint}`, {
                        method: 'post',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username,
                            usercode: usercode,
                            usercolor: usercolor,
                        })
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(err => console.log(err))
                }
                userSignin('createuser');
                setMessage("");
                setScreen(1);
            }
        }
        else if (screen === 1) {
            if (partnername.length < 3 && partnercode.length < 3) {
                setMessage("Fields must be at least 3 characters");
            }
            else {
                setMessage("");
                setScreen(3);
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

    const dontSync = () => {
        console.log("dont sync");
        setScreen(screen - 1);
    }

    const loginUser = () => {
        console.log("login user");
    }

    const createUser = () => {
        console.log("create user");
    }

    return (
            <div className="login-container">
                <div onClick={() => userColor(1)} className="app-title"><img src={stars}/>GoToBedSkat<img src={stars}/></div>
                <div className="app-title-underline"></div>
                <input onChange={(e) => setUsername(e.target.value)} style={{display: screen === 0 ? "" : "none"}} className="login-field" type="text" placeholder="username" />
                <input onChange={(e) => setUsercode(e.target.value)} style={{display: screen === 0 ? "" : "none"}} className="login-field" type="text" placeholder="code" />
                <input onChange={(e) => setPartnername(e.target.value)} style={{display: screen === 1 ? "" : "none"}} className="login-field" type="text" placeholder="partnername" />
                <input onChange={(e) => setPartnercode(e.target.value)} style={{display: screen === 1 ? "" : "none"}} className="login-field" type="text" placeholder="partnercode" />
                <div style={{display: screen === 0 ? "" : "none"}} className="login-colors-container">
                    <div onClick={() => setColor(1)} style={{border: '2px solid lightblue'}} className="login-color">
                        <div className={color === 1 ? "login-color-inner color-one" : ""}></div>
                    </div>
                    <div onClick={() => setColor(2)} style={{border: '2px solid pink'}} className="login-color">
                        <div className={color === 2 ? "login-color-inner color-two" : ""}></div>
                    </div>
                </div>
                <div style={{display: screen === 2 ? "" : "none"}} className="login-partner-message">Is {partnername} your partner?</div>
                <div style={{display: screen === 3 ? "" : "none"}} className="login-partner-message">Waiting for {partnername} to sync... <br /><br /> Go back if you wish to cancel</div>
                <div className="login-submit-container">
                    <button style={{display: screen === 0 ? "" : "none"}} onClick={() => submitForm(screen)} className="login-submit-button plus">+</button>
                    <button style={{display: screen === 1 ? "" : "none"}} onClick={() => submitForm(screen)} className="login-submit-button plus">+</button>
                    <button style={{display: screen === 1 ? "" : "none"}} onClick={() => setScreen(0)} className="login-submit-button back">&lt;</button>
                    <button style={{display: screen === 2 ? "" : "none"}} onClick={() => syncPartner()} className="login-submit-button">yes</button>
                    <button style={{display: screen === 2 ? "" : "none"}} onClick={() => dontSync()} className="login-submit-button">no</button>
                    <button style={{display: screen === 3 ? "" : "none"}} onClick={() => setScreen(1)} className="login-submit-button back">&lt;</button>
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
