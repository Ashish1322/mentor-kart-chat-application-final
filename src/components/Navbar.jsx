import React, { useContext } from 'react'
import { MainContext } from '../MainContext'

const Navbar = () => {

  const {logout,user} = useContext(MainContext)

  return (
    <div className='navbar'>
      <span className="logo">{user.name}</span>
      <div className="user">
        <img src='https://png.pngtree.com/png-clipart/20191120/original/pngtree-outline-user-icon-png-image_5045523.jpg'  alt="" />
        <span></span>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  )
}

export default Navbar