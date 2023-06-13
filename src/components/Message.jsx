import React, { useContext, useEffect, useRef } from "react";

import { MainContext } from "../MainContext";

const Message = ({ message , senderId}) => {
  
  const {user} = useContext(MainContext)
  let className = senderId == user.uid ? "message owner" : "message"
  return (
    <div
    className={className}>
      <div className="messageInfo">
        <img
          alt=""
        />
  
      </div>
      <div className="messageContent">
        <p>{message}</p>
       
      </div>
    </div>
  );
};

export default Message;
