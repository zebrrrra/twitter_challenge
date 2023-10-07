import style from './RecommendList.module.scss';
import RecommendItem from '../RecommendItem/RecommendItem';
import { useState, useEffect } from 'react';
import { getTopFollowers } from '../../apis/user';
// import useFollow from "../../hooks/FollowHook";

//import {postFollowShips, deleteFollowShips } from '../../apis/followship';
//import {useAuth} from '../../context/AuthContext';
import { useUpdateTag } from '../../context/UpdateTagContext';

const FollowRecommendList = ({ userId, loginUserId }) => {
  const [users, setUsers] = useState([]);
  const { updateTag, setUpdateTag } = useUpdateTag();
  // const { handleFollow, handleUnFollow } = useFollow(loginUserId, setUsers, setUpdateTag);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchTopFollowers = async () => {
      const userData = await getTopFollowers(abortController.signal);
      if (userData) {
        setUsers(userData);
      }
    }
    fetchTopFollowers();
    return () => {
      abortController.abort()
    }
  }, [userId, updateTag]);

  return (
    <div className={style.recommendListContainer}>
      <div className={style.HeaderContainer}>
        <h4 className={style.RecommendHeader}>推薦跟隨</h4></div>
      {users.map(user => (
        <RecommendItem
          key={user.id}
          user={user}
          loginUserId={loginUserId}
        // onFollow={handleFollow}
        // onUnfollow={handleUnFollow} 
        />
      ))}
    </div>
  )
};

export default FollowRecommendList;