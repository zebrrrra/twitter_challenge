import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import FollowCard from '../FollowCard/FollowCard';
import style from './Tab.module.scss';
import { useUpdateTag } from '../../context/UpdateTagContext';
import { useGetUserFollowersQuery, useGetUserFollowingsQuery } from '../../hooks/QueryHook';


const FollowTab = ({ userId, loginUserId }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("正在追隨");
  const location = useLocation();
  // const [followingUsers, setFollowingUsers] = useState([]);
  // const [followerUsers, setFollowerUsers] = useState([]);
  const { updateTag, setUpdateTag } = useUpdateTag();

  //LIST切換
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const fetchFollowersAndFollowings = async () => {
  //     const followingData = await getUserFollowings({ id: userId, signal: abortController.signal });
  //     const followerData = await getUserFollowers({ id: userId, signal: abortController.signal });
  //     if (followingData) {
  //       setFollowingUsers(followingData.map(user => ({
  //         ...user.Following,
  //         isCurrentUserFollowed: user.Following.isCurrentUserFollowed === 'true'
  //       })));
  //     }

  //     if (followerData) {
  //       setFollowerUsers(followerData.map(user => ({
  //         ...user.Follower,
  //         isCurrentUserFollowed: user.Follower.isCurrentUserFollowed === 'true'
  //       })));
  //     }
  //   }

  //   fetchFollowersAndFollowings();
  //   return () => {
  //     abortController.abort()
  //   }
  // }, [userId, updateTag]);

  useEffect(() => {
    const currentPath = location.pathname.split('/').pop();
    switch (currentPath) {
      case 'followers':
        setActiveTab('追隨者');
        break;
      case 'followings':
        setActiveTab('正在追隨');
        break;
      default:
        setActiveTab('追隨者');
        break;
    }
  }, [location.pathname]);

  const handleClick = (tabName) => {
    setActiveTab(tabName);
    switch (tabName) {
      case "追隨者":
        navigate(`/${userId}/followers`);
        break;
      case "正在追隨":
        navigate(`/${userId}/followings`);
        break;
      default:
        navigate(`/${userId}/followers`);
        break;
    }
  };


  return (
    <div>
      <div className={style.tabContainer}>
        <div
          className={`${style.tab} ${activeTab === "追隨者" ? style.active : ""}`}
          onClick={() => handleClick("追隨者")}
        >
          追隨者
        </div>
        <div
          className={`${style.tab} ${activeTab === "正在追隨" ? style.active : ""}`}
          onClick={() => handleClick("正在追隨")}
        >
          正在追隨
        </div>
      </div>
      <Routes key={updateTag}>
        <Route path="followings" element={<FollowingList userId={userId} loginUserId={loginUserId} />} />
        <Route path="followers" element={<FollowersList userId={userId} loginUserId={loginUserId} />} />
      </Routes>
    </div>
  );
}

export default FollowTab;

const FollowingList = ({ userId, loginUserId }) => {
  // userId是當前頁面id
  const { data: followeringsResult, isLoading } = useGetUserFollowingsQuery(userId)

  // const users = Array.isArray(followeringsResult) ? followeringsResult : Array.from(followeringsResult);

  // if (users.length === 0) {
  //   return <div className={style.noFollow}>這邊還沒有人...</div>;
  // }
  // if (followeringsLoading) {
  //   return <div className={style.noFollow}>Loading...</div>;
  // }
  return (
    followeringsResult && followeringsResult.map(user => (
      <FollowCard
        key={user.followingId}
        user={user.Following}
        cardId={user.followingId}
        userId={userId}
        loginUserId={loginUserId}
        isFollowed={JSON.parse(user.Following.isCurrentUserFollowed)}
      />
    ))
  );
};

const FollowersList = ({ userId, loginUserId }) => {
  const { data: followersResult, isLoading } = useGetUserFollowersQuery(userId)

  // const users = Array.isArray(followersResult) ? followersResult : Array.from(followersResult);

  // if (users.length === 0) {
  //   return <div className={style.noFollow}>這邊還沒有人...</div>;
  // }
  // if (followersLoading) {
  //   return <div className={style.noFollow}>Loading...</div>;
  // }

  return (
    followersResult && followersResult.map(user => (
      <FollowCard
        key={user.followerId}
        user={user.Follower}
        cardId={user.followerId}
        userId={userId}
        loginUserId={loginUserId}
        isFollowed={JSON.parse(user.Follower.isCurrentUserFollowed)}
      />
    ))
  );
};

