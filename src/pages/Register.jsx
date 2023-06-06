import React, { useState } from "react";
import { useContext } from "react";
import { MainContext } from "../MainContext";

const Register = () => {

  const {signup,setShowScreen,loading}  = useContext(MainContext)

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setName] = useState("")

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <div className="form">
          <input onChange={e => setName(e.currentTarget.value)}  required type="text" placeholder="display name" />
          <input  onChange={e => setEmail(e.currentTarget.value)} required type="email" placeholder="email" />
          <input  onChange={e => setPassword(e.currentTarget.value)} required type="password" placeholder="password" />
    
          {
            loading ?  <button disabled={true}>Please Wait...</button>
            :
            <button  onClick={() =>signup(email,password,name) }>Sign up</button>
          }
         
          
      
        </div>
        <p onClick={() => setShowScreen(0)}>
          You do have an account?  Login
        </p>
      </div>
    </div>
  );
};

export default Register;
