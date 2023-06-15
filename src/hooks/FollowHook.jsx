import { useState,useEffect } from "react";
import { getUsers } from "../apis/user";
import { postFollowShips, deleteFollowShips } from "../apis/followship";
const useFollow = (users, setUsers) => {
const [updateFlag, setUpdateFlag] = useState(false);


const handleFollow = async (id) => {
  const response = await postFollowShips(id);
  if (response && response.status === 'success') {
    setUpdateFlag(!updateFlag);
    setUsers((currentUsers) => 
      currentUsers.map((user) => 
        user.id === id ? { ...user, isCurrentUserFollowed: true } : user
      )
    );
  }
};

  const handleUnFollow = async (id) => {
    const response = await deleteFollowShips(id);
    if (response && response.status === 'success') {
      setUpdateFlag(!updateFlag);
      setUsers((currentUsers) => 
        currentUsers.map((user) => 
          user.id === id ? { ...user, isCurrentUserFollowed: false } : user
        )
      );
    }
  };
  return { users, handleFollow, handleUnFollow, updateFlag };
};

export default useFollow;