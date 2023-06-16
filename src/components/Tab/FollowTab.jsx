//import { useParams,Link } from 'react-router-dom'; 
import style from './Tab.module.scss';
import { useState, useEffect} from 'react';
import {Routes,Route, useNavigate, useLocation} from 'react-router-dom';
import FollowingList from '../FollowingList/FollowingLIst';
//import FollowerList from '../LikeList/LikeList';
//import ReplyList from '../ReplyList/ReplyList';
import useFollow from '../../hooks/FollowHook';
import FollowersList from '../FollowersList/FollowersList';
import { getUserFollowings,getUserFollowers } from "../../apis/user";


const FollowTab = ({ userId,updateTag,setUpdateTag }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("正在追隨");
    const location = useLocation();
    const [users, setUsers] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [followerUsers, setFollowerUsers] = useState([]);
    

    useEffect(() => {
        const fetchFollowersAndFollowings = async () => {
          const followingData = await getUserFollowings(userId);
          const followerData = await getUserFollowers(userId);
      
            

          if (followingData) {
            setFollowingUsers(followingData.map(user => ({
              ...user.Following,
              isCurrentUserFollowed: user.isCurrentUserFollowed
            })));
          }
      
          if (followerData) {
            setFollowerUsers(followerData.map(user => ({
              ...user.Follower,
              isCurrentUserFollowed: user.isCurrentUserFollowed
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
        setActiveTab(tabName);
        switch (tabName) {
            case "追隨者":
                navigate(userId ? `${userId}/followers` : `${userId}/followers`);
                break;
            case "正在追隨":
                navigate(userId ? `${userId}/followings` : `${userId}/followings`);
                break;
            default:
                navigate(userId ? `${userId}/followers` : `${userId}/followers`);
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
                <Route path="followings" element={<FollowingList userId={userId} 
                users={followingUsers}
                setUsers={setFollowingUsers} 
                updateTag={updateTag} 
                setUpdateTag={setUpdateTag} />} />
                <Route path="followers" element={<FollowersList userId={userId} 
                users={followerUsers}
                setUsers={setFollowerUsers}
                 updateTag={updateTag}
                  setUpdateTag={setUpdateTag}/>} />
                <Route path="*" element={<FollowingList userId={userId} setUsers={setUsers}/>} /> 
            </Routes>
        </div>
    );
}

export default FollowTab;

