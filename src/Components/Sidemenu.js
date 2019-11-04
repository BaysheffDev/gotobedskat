import React, { useState } from 'react';

const Sidemenu = ({ slide, toggleSideMenu, logout }) => {
    const [color, setColor] = useState("");

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
