import React, { useContext } from "react";
import Messages from "./Messages"
import Input from "./Input";
import { MainContext } from "../MainContext";

const Chat = () => {

  const {chatUser}  = useContext(MainContext)

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{ chatUser && chatUser.name}</span>
        <div className="chatIcons">
         
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
