// 在FollowTab.js中
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { getUserFollowings, getUserFollowers } from '../../apis/user';
import FollowCard from '../FollowCard/FollowCard';
import useFollow from '../../hooks/FollowHook';
import style from './Tab.module.scss';
import { useUpdateTag } from '../../context/UpdateTagContext';

const FollowTab = ({ userId, loginUserId }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("正在追隨");
  const location = useLocation();
  const [followingUsers, setFollowingUsers] = useState([]);
  const [followerUsers, setFollowerUsers] = useState([]);
  const { updateTag, setUpdateTag } = useUpdateTag();
  const { handleFollow, handleUnFollow } = useFollow(loginUserId, setFollowingUsers, setFollowerUsers, setUpdateTag);

  //LIST切換
  useEffect(() => {
    const fetchFollowersAndFollowings = async () => {
      const followingData = await getUserFollowings(userId);
      const followerData = await getUserFollowers(userId);
      console.log('followerData:', followerData); 
      console.log('followingData:', followingData); 
      if (followingData) {
        setFollowingUsers(followingData.map(user => ({
          ...user.Following,
          isCurrentUserFollowed: user.Following.isCurrentUserFollowed === 'true'
        })));
      }
    
      if (followerData) {
        setFollowerUsers(followerData.map(user => ({
          ...user.Follower,
          isCurrentUserFollowed: user.Follower.isCurrentUserFollowed === 'true'
        })));
      }
    }
    
    fetchFollowersAndFollowings();
  }, [userId, updateTag]);

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
    console.log('Click event:', tabName);
    setActiveTab(tabName);
    switch (tabName) {
      case "追隨者":
        navigate(`/${userId}/followers` );
        break;
      case "正在追隨":
        navigate(`/${userId}/followings`);
        break;
      default:
        navigate(`/${userId}/followers`);
        break;
    }
  };

  const FollowingList = () => {
    const users = Array.isArray(followingUsers) ? followingUsers : Array.from(followingUsers);
    
    if (users.length === 0) {
      return <div>No following users</div>;
    }
    
    return (
      users.map(user => (
        <FollowCard
          key={user.id}
          user={user}
          loginUserId={loginUserId}
          onFollow={handleFollow}
          onUnfollow={handleUnFollow}
        />
      ))
    );
  };
  
  const FollowersList = () => {
    const users = Array.isArray(followerUsers) ? followerUsers : Array.from(followerUsers);
    
    if (users.length === 0) {
      return <div>No follower users</div>;
    }
    
    return (
      users.map(user => (
        <FollowCard
          key={user.id}
          user={user}
          loginUserId={loginUserId}
          onFollow={handleFollow}
          onUnfollow={handleUnFollow}
        />
      ))
    );
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
        <Route path="followings" element={<FollowingList />} />
        <Route path="followers" element={<FollowersList />} />
      </Routes>
    </div>
  );
}

export default FollowTab;


