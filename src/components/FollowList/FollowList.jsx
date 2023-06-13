import FollowCard from "../FollowCard/FollowCard";
import { useEffect, useState } from "react";
import {useUser} from '../../context/UserContext';
import { postFollowShips,deleteFollowShips } from "../../apis/followship";


const FollowList = ({listType}) => {
  const [users, setUsers] =useState([]);
  const {user,fetchFollowings, fetchFollowers} =useUser();

  useEffect (()=> {
    const fetchData = async () =>{
      let data;
      if(listType ==='followings'){
        data = await fetchFollowings(user.id);
      } else if (listType ==='followers'){
        data = await fetchFollowers(user.id);
      }
      
      if(data) {
        const formattedData = data.map(item => {
          const user = listType === 'followings' ? item.Following : item.Follower;
          return {
            ...user,
            isCurrentUserFollowed: item.isCurrentUserFollowed
          }
        });
  
        setUsers(formattedData);
      }
    };
    fetchData();
  }, [user,listType, fetchFollowings, fetchFollowers]
  );

  const handleFollow = async (id) => {
    const response = await postFollowShips(id);
    if (response && response.status === 'success') {
      setUsers(users.map(user => user.id === id ? {...user, isCurrentUserFollowed: true} : user));
      fetchFollowings(id); // 更新UserContext中的followings
    }
  };

  const handleUnfollow = async (id) => {
    const response = await deleteFollowShips(id);
    if (response && response.status === 'success') {
      setUsers(users.map(user => user.id === id ? {...user, isCurrentUserFollowed: false} : user));
      fetchFollowings(id); // 更新UserContext中的followings
    }
  };



  return (
    <>
      {users.map(user => (
        <FollowCard
          key={user.id}
          user={user}
          onFollow={() => handleFollow(user.id)}
          onUnfollow={() => handleUnfollow(user.id)}
        />
      ))}
    </>
  );
};

export default FollowList;
