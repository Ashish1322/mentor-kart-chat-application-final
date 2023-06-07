import React, { useContext, useState } from "react";

import { MainContext } from "../MainContext";

const Search = () => {
  const [email, setEmail] = useState("");
  const {addFriend} = useContext(MainContext)
  return (
    <div className="search">
      <form className="searchForm" onSubmit={(e) => {
        e.preventDefault()
        addFriend(email)
    }}>
        <input
          type="text"
          placeholder="Find a user"
          onChange={e => setEmail(e.currentTarget.value) }
        />
       
      </form>
     
     
    </div>
  );
};

export default Search;
