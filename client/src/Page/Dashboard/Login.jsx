// Login.js
import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../../App.css'
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3000/login", { email, password });
      
      if (response.data.status === "success") {
        setIsAuthenticated(true);
        navigate("/home");
      } else {
        alert("Error: Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: Unable to login");
    }
  };
  
      


       
    

  return (
    
    
    <div className="containerr" style={{  backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <h1>سيستم إدارة الطلاب الوافدين</h1>
    <form className="login-form"  onSubmit={handleSubmit}>
      <div className="form-group">
        <h2>تسجيل الدخول</h2><br /><br />
        <label htmlFor="email" style={{ color: '#001f3f' }}>Email <span className="text-danger">*</span></label>
        <input
          type="email"
          placeholder="Username / Email"
         
          onChange={e => setEmail(e.target.value)} 
          required
        />
        <div className="highlight"></div>
      </div>
      <div className="form-group">
      <label htmlFor="password" style={{ color: '#001f3f' }}>Password <span className="text-danger">*</span></label>
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <div className="highlight"></div>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>

  );
};




export default Login;
