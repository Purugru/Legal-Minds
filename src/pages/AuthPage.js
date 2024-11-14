import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = () => {
    const [isActive, setIsActive] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Sample credentials
    const sampleEmail = 'sample@example.com';
    const samplePassword = 'password123';

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === sampleEmail && password === samplePassword) {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/home');
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <div className={`container ${isActive ? 'active' : ''}`} id="container">
            {/* Sign-Up Form */}
            <div className="form-container sign-up">
                <form>
                    <h1>Create Account</h1>
                    <div className="social-icons">
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign Up</button>
                </form>
            </div>

            {/* Sign-In Form */}
            <div className="form-container sign-in">
                <form onSubmit={handleLogin}>
                    <h1>Sign In</h1>
                    <div className="social-icons">

                    </div>
                    <span>or use your email password</span>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <a href="#">Forget Your Password?</a>
                    <button type="submit">Sign In</button>
                </form>
            </div>

            {/* Toggle Container */}
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of the site’s features</p>
                        <button className="hidden" onClick={handleLoginClick}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Welcome, Friend!</h1>
                        <p>Enter your personal details to use all of the site’s features</p>
                        <button className="hidden" onClick={handleRegisterClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
