import React, { useContext, useState } from "react";
import { MainContext } from "../MainContext";



const Input = () => {

  const [data,setData] = useState("")
  const {addChat} = useContext(MainContext)
 
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={e => setData(e.currentTarget.value) }
        value={data}
      />
      <div className="send">
        
        
        <button onClick={() => {
          addChat(data)
          setData("")
        }}>Send</button>
      </div>
    </div>
  );
};

export default Input;
