import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { MainContext } from '../MainContext'
import { useContext } from 'react'
import {onValue,ref} from "firebase/database"
import { useEffect } from 'react'
import {db} from "../firebase"
const Home = () => {
  const {user,setUser} = useContext(MainContext)

  useEffect(() => {
    const userRef = ref(db,"users/"+user.uid)
    onValue(userRef,(snapshot) => {
      setUser(snapshot.val())
    })
  },[])

  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home