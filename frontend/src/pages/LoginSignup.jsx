import React, { useState } from 'react'
import './CSS/LoginSignup.css'
export const LoginSignup = () => {

  const [state,setState] = useState("Sign Up")
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:"",
  })

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async () => {
    console.log("Login Function Executed", formData);
    let resData;
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      resData = await response.json();

      if (resData.success) {
        localStorage.setItem('auth-token', resData.token);
        window.location.replace("/");
      } else {
        alert(resData.errors);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const signUp = async () => {
    console.log("Sign Up Function Executed", formData);
    let resData;
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      resData = await response.json();

      if (resData.success) {
        localStorage.setItem('auth-token', resData.token);
        window.location.replace("/");
      } else {
        alert(resData.errors);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      alert("An error occurred. Please try again later.");
    }
  };


  return (

    <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>
            {state}
          </h1>
          <div className="loginsignup-fields">
           {state === "Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text"  placeholder='Your Name'/>:<></>} 
            <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Your Email'/>
            <input name='password' value={formData.password} onChange={changeHandler}  type="password" placeholder='Password'/>
          </div>
          <button onClick={()=>{state==="Login"?login():signUp()}}>
            Continue
          </button>
          {state==="Sign Up"?<p className="loginsignup-login">Already Have an Account? <span onClick={()=>{setState("Login")}}>Login Here</span> </p>:
          <p className="loginsignup-login">Create an Account? <span onClick={()=>{setState("Sign Up")}}>Click Here</span> </p>}
          <div className="loginsignup-agree"> 
            <input type="checkbox" name='' id='' />
            <p>By continuing, i agree to the terms of use & Privacy Policy</p>
          </div>
        </div>
    </div>
  )
}
