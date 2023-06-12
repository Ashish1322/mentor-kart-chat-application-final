import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";

// context
import {MainContext} from "./MainContext"
import { useState } from "react";

// firebase import
import {auth,db} from "./firebase"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,updateProfile} from "firebase/auth"
import {ref,child,set, get, query, orderByChild, equalTo, update, push} from "firebase/database"

function App() {

  // states
  const [user,setUser] = useState(null)
  const [chatUser,setChatUser] = useState(null)

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
    
    // when user is loggedIn fin the user Details from the database and store in the state
    const dbRef = ref(db)
    get(child(dbRef,'users/'+response.user.uid))
    .then(snapshot => {
      if(snapshot.exists())  
      {
        setUser(snapshot.val())
        console.log(snapshot.val())
      }
      setLoading(false)
      setShowScreen(2)
    })
    .catch((err) => {
      setLoading(false)
      alert(err.message)
    })

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
        // STEP 3: add user in the database 
        const dbRef = ref(db,"users")
        const newLocationRef = child(dbRef,response.user.uid)
        set(newLocationRef,{
          name: name,
          uid: response.user.uid,
          email: response.user.email,
          friends: "[]"
        })
        .then(() => {
          alert("Account Created ")
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          alert(err.message)
        })

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

  // add the user with given email in current user friend list
  // add you in the frirnd list of given user
  const addFriend = (email) => {
    
    // 1. Find user with given email
    const friendRef = query(ref(db,'users/'),orderByChild("email"),equalTo(email))
    get(friendRef)
    .then( async snapshot => {

      const friend = Object.values(snapshot.val())[0]
      
      // adding this frined in the current loggedin user friend lsit
      const updates = {}
      updates['/users/'+user.uid] = {
        ...user,
        friends: JSON.stringify([...JSON.parse(user.friends),friend])
      }
      await update(ref(db),updates)

      // adding current logged in user in the friend list of the friend
      const updates2 = {}
      updates2['/users/'+friend.uid] = {
        ...friend,
        friends: JSON.stringify([...JSON.parse(friend.friends),user])
      }
      await update(ref(db),updates2)


      
    })
  }

  const addChat = (message) => {
    const messageRef = push(ref(db,"chats"))
    const content = {
      message: message,
      messageId: user.uid > chatUser.uid ? user.uid + chatUser.uid : user.uid + chatUser.uid

    }
    set(messageRef,content)
    .then(()=>{
      console.log("done")
    })
    .catch(err => alert(err.message))
  }

  return (
    
   <div>
    <MainContext.Provider value={{user,login,signup,logout,setShowScreen,loading,addFriend,
      setUser,chatUser,setChatUser, addChat}}>
      {
        showComponent()
      }
    </MainContext.Provider>
   </div>
  );
}

export default App;
