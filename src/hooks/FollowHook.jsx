import { useState,useEffect } from "react";
import { getUsers } from "../apis/user";
import { postFollowShips, deleteFollowShips } from "../apis/followship";

const useFollow = (
  loginUserId,
  setFollowingUsers = () => {},
  setFollowerUsers = () => {},
  setRecommendUsers = () => {},
  setUpdateTag
) => {
const [updateTag, setLocalUpdateTag] = useState(false);
//let updateTagGlobal = false;
//const setUpdateTagGlobal = () => updateTagGlobal = !updateTagGlobal;

const handleFollow = async (id) => {
  try {
    const response = await postFollowShips(id);
    if (response && response.status === 'success') {
      setLocalUpdateTag(!updateTag);

      //Following的用戶清單
      setFollowingUsers((currentUsers) => {
        const updatedUsers = Array.isArray(currentUsers) ? currentUsers : [currentUsers];
        return updatedUsers.map((user) =>
          user.id === id ? { ...user, isCurrentUserFollowed: true } : user
        );
      });

      //Follower的用戶清單
      setFollowerUsers((currentUsers) => {
        const updatedUsers = Array.isArray(currentUsers) ? currentUsers : [currentUsers];
        return updatedUsers.map((user) =>
          user.id === id ? { ...user, isCurrentUserFollowed: true } : user
        );
      });

      // 更新推薦用戶列表
      setRecommendUsers((currentUsers) => {
        const updatedUsers = Array.isArray(currentUsers) ? currentUsers : [currentUsers];
        return updatedUsers.map((user) =>
          user.id === id ? { ...user, isCurrentUserFollowed: true } : user
        );
      });

      setUpdateTag(prevState => !prevState);
    }
  } catch (error) {
    console.log('handleFollow error:', error);
  }
};



const handleUnFollow = async (id) => {
  try {
    const response = await deleteFollowShips(id);
    if (response && response.status === 'success') {
      setLocalUpdateTag(!updateTag);
       //Following的用戶清單
      setFollowingUsers((currentUsers) => {
        const updatedUsers = Array.isArray(currentUsers) ? currentUsers : [currentUsers];
        return updatedUsers.map((user) =>
          user.id === id ? { ...user, isCurrentUserFollowed: false } : user
        );
      });
        //Follower的用戶清單
      setFollowerUsers((currentUsers) => {
        const updatedUsers = Array.isArray(currentUsers) ? currentUsers : [currentUsers];
        return updatedUsers.map((user) =>
          user.id === id ? { ...user, isCurrentUserFollowed: false } : user
        );
      });
      // 更新推薦用戶列表
      setRecommendUsers((currentUsers) => {
        const updatedUsers = Array.isArray(currentUsers) ? currentUsers : [currentUsers];
        return updatedUsers.map((user) =>
          user.id === id ? { ...user, isCurrentUserFollowed: false } : user
        );
      });
      setUpdateTag(prevState => !prevState);
    }
  } catch (error) {
    console.log('handleFollow error:', error);
  }
};
  return { loginUserId, handleFollow, handleUnFollow, updateTag};
};

export default useFollow;