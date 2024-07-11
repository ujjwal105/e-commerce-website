import React, { useState } from 'react'
import './CSS/LoginSignup.css'
export const LoginSignup = () => {

  const [state,setState] = useState("Sign Up")

  const login = async ()=>{
    console.log("Login Function Executed");
  }
  const signUp = async ()=>{
    console.log("Sign Up Function Executed");
  }


  return (

    <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>
            {state}
          </h1>
          <div className="loginsignup-fields">
           {state === "Sign Up"?<input type="text"  placeholder='Your Name'/>:<></>} 
            <input type="email" placeholder='Your Email'/>
            <input type="text" placeholder='Password'/>
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
