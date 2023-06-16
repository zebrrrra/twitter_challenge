import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext'; 
import { postFollowShips, deleteFollowShips } from "../apis/followship";

const FollowContext = createContext();

export const FollowProvider= ({ children }) =>{
  const [users, setUsers] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);

  const { user } = useAuth(); // 登入用戶

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

  // 登入用戶資訊
  return (
    <FollowContext.Provider value={{ user, users, handleFollow, handleUnFollow, updateFlag }}>
      {children}
    </FollowContext.Provider>
  );
}

export function useFollow() {
  const context = useContext(FollowContext);
  if (context === undefined) {
    throw new Error('useFollow must be used within a FollowProvider');
  }
  return context;
}
