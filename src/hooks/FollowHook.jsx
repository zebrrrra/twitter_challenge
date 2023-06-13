import { useState } from "react";
import { getUsers, postFollowShips, deleteFollowShips } from "../../apis/user";

const useFollow = () => {
  const [users, setUsers] = useState([]);

  const handleFollow = async (id) => {
    const response = await postFollowShips(id);
    if (response && response.status === 'success') {
      const updatedUser = await getUsers(id);
      if (updatedUser) {
        setUsers((currentUsers) => currentUsers.map((user) => user.id === id ? { ...user, ...updatedUser } : user));
      }
    }
  };

  const handleUnFollow = async (id) => {
    const response = await deleteFollowShips(id);
    if (response && response.status === 'success') {
      const updatedUser = await getUsers(id);
      if (updatedUser) {
        setUsers((currentUsers) => currentUsers.map((user) => user.id === id ? { ...user, ...updatedUser } : user));
      }
    }
  };

  return { users, handleFollow, handleUnFollow };
};

export default useFollow;