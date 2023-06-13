
import React, { useContext, useEffect, useState } from "react";
import Message from "./Message"

const Messages = ({messages}) => {



  return (
    <div className="messages">
      {messages.map((m,index) => (
        <Message message={m.message} key={index} senderId = {m.senderId} />
      ))}
    </div>
  );
};

export default Messages;
