import React from 'react';
import './App.css';
import Grid from './Components/Grid.js';
import Login from './Components/Login.js';

function App() {
    if (localStorage.getItem("userId")) {
        return (
            <div className="App">
            <Grid />
            </div>
        );
    }
    else {
        return (
            <div className="App">
            <Login />
            </div>
        );
    }
}

export default App;
