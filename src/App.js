import React, { useState } from 'react';
import './App.css';
import Grid from './Components/Grid.js';
import Login from './Components/Login.js';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("userId") && localStorage.getItem("partnerId") ? true : false);

    const login = () => {
        setLoggedIn(true);
    }
    const logout = () => {
        localStorage.clear();
        setLoggedIn(false);
    }

    if (loggedIn) {
        return (
            <div className="App">
            <Grid logout={logout} />
            </div>
        );
    }
    else {
        return (
            <div className="App">
            <Login openGrid={login} />
            </div>
        );
    }
}

export default App;
