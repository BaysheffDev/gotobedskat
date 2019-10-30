import React from 'react';

const Sidemenu = ({ slide, toggleSideMenu }) => {
    return (
        <div className="sidemenu-container">
            <div onClick={() => toggleSideMenu()} className={"sidemenu-overlay " + (slide ? "overlay-open" : "")}></div>
            <div className={"sidemenu " + (slide ? "sidemenu-open" : "")}>
                <div className="sidemenu-field-container">
                    <div className="sidemenu-field-label">Label</div>
                    <div className="sidemenu-input-container">
                        <input type="text" placeholder="Name"/>
                        <button>Submit</button>
                    </div>
                </div>
                <div className="sidemenu-field-container">
                    <div className="sidemenu-field-label">Label</div>
                    <div className="sidemenu-input-container">
                        <input type="text" placeholder="Name"/>
                        <button>Submit</button>
                    </div>
                </div>
                <div className="sidemenu-bottom-note">
                    For Lest &#60;3
                </div>
            </div>
        </div>
    );
}

export default Sidemenu;
