import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Link your styles here

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate user registration (you can connect this to your backend/API)
    console.log('User Registered:', formData);
    alert('Registration Successful!');
    navigate('/login');
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form-box">
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
        <p onClick={() => navigate('/login')} className="form-link">Already have an account? Login</p>
      </form>
    </div>
  );
};

export default Register;
