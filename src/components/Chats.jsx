
import React, { useContext, useEffect, useState } from "react";

import { MainContext } from "../MainContext";
const Chats = () => {


  const {user} = useContext(MainContext)
  console.log(JSON.parse(user.friends))


  return (
    <div className="chats">

    {
      JSON.parse(user.friends).map(friend => 
        <div
        className="userChat"
        key={friend.uid}
        
      >
        <img src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg" alt="" />
        <div className="userChatInfo">
          <span>{friend.name}</span>
          <p>{friend.email}</p>
        </div>
      </div>
      )
    }
        
 
    </div>
  );
};

export default Chats;
