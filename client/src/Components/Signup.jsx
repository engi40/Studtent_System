import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import '../App.css'
import axios from 'axios'
import '../Page/Dashboard/style.css';
const Signup = () => {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate=useNavigate()
    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:3000/signup", { email, password })
          .then(res => {
            if (res.data.status) {
              navigate("/login")
            }
            else{
              alert("Error");
            }
    
          })
          .catch(err => console.log(err));
    
      }
    
    
           
      
    return (
        <div className='sign-up-container'>

            <form className="sign-up-form"onSubmit={handleSubmit}>
                <h2>Sign up</h2>
                
                <label htmlFor='email'>Email:</label>
                <input type="email" autoComplete='off' placeholder="Email" onChange={e=>setEmail(e.target.value)} />
                <label htmlFor='password'>Password:</label>
                <input type="password" placeholder="********" onChange={e=>setPassword(e.target.value)} />
                <button type="submit">Sign up</button>
                <p>Already have an account?<Link to="/login">Login</Link></p>
            </form>

        </div>
    )
}

export default Signup
