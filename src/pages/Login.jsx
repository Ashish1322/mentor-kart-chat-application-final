import React, { useState } from "react";
import { useContext } from "react";

import { MainContext } from "../MainContext";

const Login = () => {

  const {login,setShowScreen,loading} = useContext(MainContext)

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Login</span>
        <div className="form" >
          <input onChange={e => setEmail(e.currentTarget.value) } type="email" placeholder="email" />
          <input onChange={e => setPassword(e.currentTarget.value) }  type="password" placeholder="password" />
          {
            loading ? 
            <button disabled={true}>Please Wait....</button>
            :
            <button onClick={() => login(email,password)}>Sign in</button>
          }
         
          

        </div>
        <p onClick={() => setShowScreen(1)}>You don't have an account? Register</p>
      </div>
    </div>
  );
};

export default Login;
