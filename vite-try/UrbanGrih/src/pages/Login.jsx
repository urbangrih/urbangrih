import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace this with real authentication logic
    console.log('Logging in with:', credentials);
    alert('Login Successful!');
    navigate('/design'); // Redirect to design page
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="form-box">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
        <p onClick={() => navigate('/register')} className="form-link">Don’t have an account? Register</p>
      </form>
    </div>
  );
};

export default Login;
