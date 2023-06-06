import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";

// context
import {MainContext} from "./MainContext"
import { useState } from "react";

// firebase import
import {auth} from "./firebase"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,updateProfile} from "firebase/auth"

function App() {

  // states
  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(false)
 
  // 0 - Login
  // 1 - Register
  // 2 - Home
  const [showScreen,setShowScreen] = useState(0)

  const showComponent = () => {
    if(showScreen == 0) return <Login />
    else if (showScreen == 1) return <Register />
    else if( showScreen == 2) return <Home />
  }
  // login function
  const login = (email,password) => {
    setLoading(true)
   signInWithEmailAndPassword(auth,email,password)
   .then(response => {
    // storing user Details
    setUser(response.user)
    setLoading(false)
    setShowScreen(2)

   })
   .catch(err => {
    setLoading(false)
    alert(err.message)
   })

  }

  // creating account
  const signup = (email,password,name) => {

    setLoading(true)
    createUserWithEmailAndPassword(auth,email,password)
    .then(response => {
      // user is created
      updateProfile(response.user, {displayName: name})
      .then((user) => {
        setLoading(false)
        alert("Account Created Successfully")
      })
      .catch(err =>{ 
        alert(err.message)
        setLoading(false)
      })
    })
    .catch((err) => {
      alert(err.message)
      setLoading(false)
    })
  }

  // singout
  const logout = () => {
   setUser(null)
   setShowScreen(0)
  }

  return (
    
   <div>
    <MainContext.Provider value={{user,login,signup,logout,setShowScreen,loading}}>
      {
        showComponent()
      }
    </MainContext.Provider>
   </div>
  );
}

export default App;
