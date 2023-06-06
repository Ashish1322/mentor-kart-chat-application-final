import React, { useContext, useEffect, useRef } from "react";


const Message = ({ message }) => {


  return (
    <div
    className="message owner">
      <div className="messageInfo">
        <img
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>HIII</p>
       
      </div>
    </div>
  );
};

export default Message;
