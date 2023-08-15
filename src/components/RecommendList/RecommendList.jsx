import style from './RecommendList.module.scss';
import RecommendItem from '../RecommendItem/RecommendItem';
import { useState, useEffect } from 'react';
import { getTopFollowers } from '../../apis/user';
import useFollow from "../../hooks/FollowHook";
//import {postFollowShips, deleteFollowShips } from '../../apis/followship';
//import {useAuth} from '../../context/AuthContext';
import { useUpdateTag } from '../../context/UpdateTagContext';
import { useQuery } from "@tanstack/react-query"
import Skeleton from 'react-loading-skeleton';

const RecommendList = ({ userId, loginUserId }) => {
  const [users, setUsers] = useState([]); //TODO採用react query後,此state可移除
  const { updateTag, setUpdateTag } = useUpdateTag();
  // TODO setUsers移除/修改useFollow
  const { handleFollow, handleUnFollow } = useFollow(loginUserId, setUsers, setUpdateTag);
  const { data, isLoading, status, fetchStatus } = useQuery({ queryKey: ['getTopFollowers', { userId, updateTag }], queryFn: getTopFollowers, refetchOnWindowFocus: false })

  if (isLoading) {
    return <Skeleton count={6} className={style.skeleton} />
  }
  // console.log('結果', status)
  // console.log('fetchStatus', fetchStatus)

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const fetchTopFollowers = async () => {
  //     const userData = await getTopFollowers(abortController.signal);
  //     if (userData) {
  //       setUsers(userData);
  //     }
  //   }
  //   fetchTopFollowers();
  //   return () => {
  //     abortController.abort()
  //   }
  // }, [userId, updateTag]);
  return (
    <div className={style.recommendListContainer}>
      <div className={style.HeaderContainer}>
        <h4 className={style.RecommendHeader}>推薦跟隨</h4></div>
      {data ? data.map(user => (
        <RecommendItem
          key={user.id}
          user={user}
          loginUserId={loginUserId}
          onFollow={handleFollow}
          onUnfollow={handleUnFollow} />
      )) : null}
    </div>
  )
};

export default RecommendList;