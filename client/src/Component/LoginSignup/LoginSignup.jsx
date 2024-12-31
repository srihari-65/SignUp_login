import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './LoginSignup.css';
import axios from 'axios';

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = action === "Login" ? 'http://localhost:5000/users/login' : 'http://localhost:5000/users/signup';    
        const data = action === "Login" 
            ? { email, password } 
            : { name, email, password };

        try {
            const response = await axios.post(url, data);
            console.log(response.data);

            if (action === "Sign Up") {
                alert("User successfully registered!");
                setAction("Login");
                setEmail('');
                setPassword('');
                setName('');
            } else if (action === "Login") {
                alert("User login successful!");
                navigate('/welcome'); // Redirect to the welcome page
            }
        } catch (error) {
            setError(error.response ? error.response.data.error : 'Something went wrong');
            console.error('Error:', error);
        }
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>

            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit} className="inputs">
                {action === "Sign Up" && (
                    <div className="input">
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                )}

                <div className="input">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

                <div className="input">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>

                {action === "Login" && (
                    <div className="forget-password">
                        Lost Password? <span>Click Here!</span>
                    </div>
                )}

                <div className="submit-container">
                    <button type="submit" className="submit">
                        {action === "Login" ? "Login" : "Sign Up"}
                    </button>
                </div>
            </form>

            <div className="submit-container">
                <div
                    className={action === "Login" ? "submit gray" : "submit"}
                    onClick={() => setAction("Sign Up")}
                >
                    Sign Up
                </div>
                <div
                    className={action === "Sign Up" ? "submit gray" : "submit"}
                    onClick={() => setAction("Login")}
                >
                    Login
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
