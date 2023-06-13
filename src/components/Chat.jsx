import React, { useContext,useEffect,useState } from "react";
import Messages from "./Messages"
import Input from "./Input";
import { MainContext } from "../MainContext";
import { onValue ,ref} from "firebase/database";
import {db} from "../firebase"

const Chat = () => {

  const {chatUser,user}  = useContext(MainContext)

  // state to store all the messages
  const [messages,setMessages] = useState([])

  useEffect(() => {
       const cleanupFunction = onValue(ref(db,"chats"), (snaphot) => {
        // it will contain all the chats of all the users
        const allMessages = snaphot.val();

        // from allmessages fetch the required chat ( user, chatFrind)
        let requiredMessages = []
        let requiredMessageId = user.uid > chatUser.uid ? user.uid + chatUser.uid :  chatUser.uid+ user.uid

       
        for(let message in allMessages)
        {
          if(allMessages[message]["messageId"] == requiredMessageId)
          {
            requiredMessages.push(allMessages[message])
          }
        }

        setMessages(requiredMessages)

    })

    return () => {
      cleanupFunction()
    }
  },[chatUser])

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{ chatUser && chatUser.name}</span>
        <div className="chatIcons">
         
        </div>
      </div>
      <Messages  messages = {messages}/>
      <Input/>
    </div>
  );
};

export default Chat;
