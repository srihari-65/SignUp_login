import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './Component/LoginSignup/LoginSignup';
import WelcomePage from './Component/LoginSignup/WelcomePage';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginSignup />} />
                <Route path="/welcome" element={<WelcomePage/>} />
            </Routes>
        </Router>
    );
};

export default App;
