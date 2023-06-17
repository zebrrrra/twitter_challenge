/*import FollowCard from "../FollowCard/FollowCard";
import useFollow from "../../hooks/FollowHook";
import { useEffect,useState } from "react";
import { getUserFollowers } from "../../apis/user";

const FollowersList = ({userId,loginUserId,setUpdateTag })=>{
const [users, setUsers] = useState([]);
const {handleFollow,handleUnFollow,updateTag}=useFollow(loginUserId,setUsers,setUpdateTag);



useEffect(()=>{
    const fetchFollowers= async ()=>{
         console.log('updateTag changed:', updateTag); 
        const userData = await getUserFollowers(userId);
        console.log(userData);//測試
        console.log(users);
        if (userData){
            setUsers(userData.map(user=>({
                ...user.Follower,
                isCurrentUserFollowed: user.Follower.isCurrentUserFollowed === 'true'
            })
            ));
        }
    }
    fetchFollowers();
},[userId,updateTag]);


    return (
        <>
        {users&&users.map(user => (
    <FollowCard
    key ={user.id}
    user={user}
    loginUserId={loginUserId}
    onFollow={handleFollow}
    onUnfollow={handleUnFollow} 
    />
    
     ))}
     </>
    )
    };

export default FollowersList;*/