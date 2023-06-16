import FollowCard from "../FollowCard/FollowCard";
import useFollow from "../../hooks/FollowHook";
import { useEffect,useState } from "react";
import { getUserFollowings } from "../../apis/user";


const FollowingList = ({userId,loginUserId,setUpdateTag})=>{
    const [users, setUsers] = useState([]);
    const {handleFollow, handleUnFollow,updateTag} = useFollow(loginUserId,setUsers);
    console.log('Rendering FollowingList with users:', users);

    useEffect(()=>{
        const fetchFollowings= async ()=>{
            const userData = await getUserFollowings(userId);
            console.log(userData);//測試
            console.log(users);
            if (userData){
                setUsers(userData.map(user=>({
                    ...user.Following,
                     isCurrentUserFollowed: user.Following.isCurrentUserFollowed === 'true'
                })
                ));
            }
        }
        fetchFollowings();
    },[userId,updateTag]);

    return (
        <>
        {users&& users.map(user => (
    <FollowCard
    key ={user.id}
    user={user}
    loginUserId={loginUserId}
    onFollow={handleFollow}
    onUnfollow={handleUnFollow}/>
    
     ))}
     </>
    )
    };

export default FollowingList;